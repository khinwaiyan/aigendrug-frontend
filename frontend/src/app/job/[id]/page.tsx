"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/app/components/Button";
import { Header } from "@/app/components/Header";
import { Wrapper } from "@/app/components/Wrapper";
import { useServiceContext } from "@/service/ServiceContext";
import { Experiment } from "@/service/experiment/interface";
import { NumBullet } from "@/app/components/NumBullet";
import Image from "next/image";
import { formatDate } from "@/utils/formatTime";
import { useParams } from "next/navigation";
import { Job } from "@/service/job/interface";
import { Loading } from "@/app/components/Loading";
import ExperimentModal from "@/app/components/ExperimentModal";
import { toast } from "react-toastify";
export default function JobDetail() {
  const { id } = useParams();
  const jobId = Number(id);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [job, setJob] = useState<Job>();
  const { experimentService, jobService } = useServiceContext();
  const [measuredValues, setMeasuredValues] = useState<{
    [key: number]: number;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedExperiments, setSelectedExperiments] = useState<Set<number>>(
    new Set()
  );
  const [isExperimentModalOpen, setIsExperimentModalOpen] = useState(false);

  const fetchExperiments = useCallback(
    async (showLoading = true) => {
      if (showLoading) setLoading(true);
      try {
        const experiments = await experimentService.getAllExperimentsByJobId(
          jobId
        );
        const sortedExperiments = experiments.sort((a, b) => {
          if (a.training_status === 1 && b.training_status !== 1) return -1;
          if (a.training_status !== 1 && b.training_status === 1) return 1;

          const aValue = a.predicted_value ?? 0;
          const bValue = b.predicted_value ?? 0;
          return aValue - bValue;
        });
        setExperiments(sortedExperiments);
      } catch (error) {
        console.error("Failed to fetch experiments:", error);
      } finally {
        if (showLoading) setLoading(false);
      }
    },
    [experimentService, jobId]
  );

  useEffect(() => {
    if (!isNaN(jobId)) {
      fetchExperiments();
      const intervalId = setInterval(() => fetchExperiments(false), 5000);

      return () => clearInterval(intervalId);
    }
  }, [jobId, fetchExperiments]);

  useEffect(() => {
    const fetchJob = async () => {
      const job = await jobService.getJobById(jobId);
      setJob(job);
    };
    fetchJob();
  }, [jobId, jobService]);

  const getIconSrc = (status: number) => {
    switch (status) {
      case 0:
        return "/icons/checkCircle.svg";
      case 1:
        return "/icons/loader.svg";
      case 2:
        return "/icons/checkCircle.svg";
      case 3:
        return "/icons/error.svg";
      default:
        return "-";
    }
  };
  const handleMeasuredValueChange = (experimentId: number, value: string) => {
    setMeasuredValues((prevValues) => ({
      ...prevValues,
      [experimentId]: parseFloat(value),
    }));
  };

  const handleCheckboxChange = (experimentId: number) => {
    setSelectedExperiments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(experimentId)) {
        newSet.delete(experimentId);
      } else {
        newSet.add(experimentId);
      }
      return newSet;
    });
  };

  const handleExecuteSelected = async () => {
    const experimentsToExecute = Array.from(selectedExperiments).map((id) => ({
      id,
      measuredValue: measuredValues[id],
    }));

    if (experimentsToExecute.length === 0) {
      alert("Please select experiments to run.");
      return;
    }

    const invalidExperiments = experimentsToExecute.filter(
      (exp) => !exp.measuredValue
    );
    if (invalidExperiments.length > 0) {
      alert("Please enter measured values for all selected experiments.");
      return;
    }

    try {
      await Promise.all(
        experimentsToExecute.map(async ({ id, measuredValue }) => {
          const existingExperiment = await experimentService.getExperimentById(
            id
          );

          await experimentService.createExperiment({
            type: existingExperiment.type,
            name: existingExperiment.name,
            ligand_smiles: existingExperiment.ligand_smiles,
            measured_value: measuredValue,
            job_id: existingExperiment.job_id,
          });

          await experimentService.deleteExperiment(id);
        })
      );
      alert("Experiments updated successfully!");
      setSelectedExperiments(new Set());
      await fetchExperiments();
    } catch (error) {
      console.error("Failed to update experiments:", error);
      alert("Failed to update experiments.");
    }
  };

  const openExperimentModal = () => {
    setIsExperimentModalOpen(true);
  };

  const closeExperimentModal = () => {
    setIsExperimentModalOpen(false);
  };

  const handleDeleteExperiment = async (experimentId: number) => {
    if (!confirm("Are you sure you want to delete this experiment?")) {
      return;
    }

    try {
      await experimentService.deleteExperiment(experimentId);
      fetchExperiments();
    } catch (error) {
      console.error("Failed to delete experiment:", error);
      alert("Failed to delete experiment.");
    }
  };

  const handleExperimentAdded = () => {
    if (!isNaN(jobId)) {
      setTimeout(() => {
        fetchExperiments();
        toast.success("Experiment added successfully");
      }, 500);
    }
  };

  return (
    <Wrapper>
      <Header label="AIGENDRUG" labelR={job?.target_protein_name || ""} />
      <div className="flex justify-end px-4 mt-4">
        <Button onClick={openExperimentModal}>
          {"Add Experiment  "}
          <Image
            src="/icons/plus.svg"
            alt="Plus icon"
            width={16}
            height={16}
            className="inline-block"
          />
        </Button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="JobDetailTable mt-10 px-4">
          <div className="Header grid grid-cols-9 gap-4 flex items-center text-center bg-cus_navy_light p-4 ">
            <span className="font-bold col-span-1"></span>
            <span className="font-bold col-span-1">Rank</span>
            <span className="font-bold col-span-2">Ligand</span>
            <span className="font-bold col-span-1">Expected Value</span>
            <span className="font-bold col-span-1">Observed Value</span>
            <span className="font-bold col-span-1">Status</span>
            <span className="font-bold col-span-1">Date</span>
            <span className="col-span-1">
              <Button
                className="col-span-1 text-sm"
                onClick={handleExecuteSelected}
                disabled={selectedExperiments.size === 0}
              >
                Run
              </Button>
            </span>
          </div>
          <div className="Body pt-4">
            {experiments.map((experiment, index) => (
              <div
                key={experiment.id}
                className="row1 bg-cus_gray text-cus_navy grid grid-cols-9 gap-4 text-center p-4 my-4 items-center justify-center rounded-lg"
              >
                <span className="col-span-1">
                  <input
                    type="checkbox"
                    checked={selectedExperiments.has(experiment.id)}
                    onChange={() => handleCheckboxChange(experiment.id)}
                    className="w-4 h-4"
                  />
                </span>
                <span className="col-span-1 flex justify-center">
                  <NumBullet label={(index + 1).toString()} />
                </span>
                <span className="col-span-2 break-words whitespace-normal">
                  {experiment.ligand_smiles}
                </span>
                <span className="col-span-1">
                  {experiment.predicted_value !== 0
                    ? experiment.predicted_value
                    : experiment.measured_value}
                </span>

                <input
                  type="number"
                  placeholder={
                    experiment.measured_value?.toString() || "실험값"
                  }
                  step="any"
                  min="0"
                  max="1"
                  onChange={(e) =>
                    handleMeasuredValueChange(experiment.id, e.target.value)
                  }
                  className="col-span-1 py-1 border-2 border-cus_yellow text-cus_gray_light text-center rounded-md cursor-pointer"
                />

                <span className="col-span-1 flex justify-center">
                  <Image
                    src={getIconSrc(experiment.training_status)}
                    alt={
                      experiment.training_status === 1
                        ? "Training"
                        : experiment.training_status === 2
                        ? "Trained"
                        : "Failed"
                    }
                    className={
                      experiment.training_status === 1 ? "animate-spin" : ""
                    }
                    width={28}
                    height={28}
                  />
                </span>

                <span className="col-span-1">
                  {formatDate(experiment.created_at)}
                </span>
                <span className="col-span-1 flex justify-center">
                  <div
                    onClick={() => handleDeleteExperiment(experiment.id)}
                    className="cursor-pointer"
                  >
                    <Image
                      src="/icons/delete.svg"
                      alt="Delete Icon"
                      width={28}
                      height={28}
                    />
                  </div>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {isExperimentModalOpen && (
        <ExperimentModal
          jobId={jobId}
          onClose={closeExperimentModal}
          onExperimentAdded={handleExperimentAdded}
        />
      )}
    </Wrapper>
  );
}
