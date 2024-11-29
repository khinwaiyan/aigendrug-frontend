"use client";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (!isNaN(jobId)) {
      const fetchExperiments = async () => {
        setLoading(true);
        try {
          const experiments = await experimentService.getAllExperimentsByJobId(
            jobId
          );
          const sortedExperiments = experiments.sort((a, b) => {
            const aValue = a.predicted_value ?? 0;
            const bValue = b.predicted_value ?? 0;
            return aValue - bValue;
          });

          setExperiments(sortedExperiments);
        } catch (error) {
          console.error("Failed to fetch experiments:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchExperiments();
    }
  }, [jobId, experimentService]);

  useEffect(() => {
    const fetchJob = async () => {
      const job = await jobService.getJobById(jobId);
      setJob(job);
    };
    fetchJob();
  }, [jobId, jobService]);

  const getIconSrc = (status: number) => {
    switch (status) {
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
        experimentsToExecute.map(({ id, measuredValue }) =>
          experimentService.createExperiment({
            type: 0,
            name: `Experiment with measured value ${id}`,
            ligand_smiles:
              experiments.find((e) => e.id === id)?.ligand_smiles || "",
            measured_value: measuredValue,
            job_id: jobId,
          })
        )
      );
      alert("Experiments executed successfully!");
    } catch (error) {
      console.error("Failed to execute experiments:", error);
      alert("Failed to execute experiments.");
    }
  };

  return (
    <Wrapper>
      <Header label="AIGENDRUG" labelR={job?.target_protein_name || ""} />
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
                <span className="col-span-1">{experiment.predicted_value}</span>

                {experiment.measured_value ? (
                  <span className="col-span-1">
                    {experiment.measured_value}
                  </span>
                ) : (
                  <input
                    type="number"
                    placeholder="실험값"
                    step="any"
                    min="0"
                    max="1"
                    onChange={(e) =>
                      handleMeasuredValueChange(experiment.id, e.target.value)
                    }
                    className="col-span-1 py-1 border-2 border-cus_yellow text-cus_gray_light text-center rounded-md cursor-pointer"
                  />
                )}

                <span className="col-span-1 flex justify-center">
                  {experiment.training_status !== 0 && (
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
                  )}
                </span>

                <span className="col-span-1">
                  {formatDate(experiment.created_at)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Wrapper>
  );
}
