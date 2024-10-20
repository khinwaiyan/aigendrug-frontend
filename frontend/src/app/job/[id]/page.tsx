"use client";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/Button";
import { Header } from "@/app/components/Header";
import { Wrapper } from "@/app/components/Wrapper";
import { useService } from "@/service/useService";
import { Experiment } from "@/service/experiment/interface";
import { NumBullet } from "@/app/components/NumBullet";
import Image from "next/image";
import { formatDate } from "@/utils/formatTime";
import { useParams } from "next/navigation";

export default function JobDetail() {
  const { id } = useParams();
  const jobId = Number(id);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const { experimentService } = useService();
  const [measuredValues, setMeasuredValues] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    if (!isNaN(jobId)) {
      const fetchExperiments = async () => {
        try {
          const experiments = await experimentService.getAllExperimentsByJobId(
            jobId
          );
          const sortedExperiments = experiments.sort(
            (a, b) => a.predicted_value - b.predicted_value
          );
          setExperiments(sortedExperiments);
        } catch (error) {
          console.error("Failed to fetch experiments:", error);
        }
      };

      fetchExperiments();
    }
  }, [jobId, experimentService]);

  const getIconSrc = (status: number) => {
    switch (status) {
      case 1: // Training
        return "/icons/loader.svg";
      case 2: // Trained
        return "/icons/checkCircle.svg";
      case 3: // Failed
        return "/icons/error.svg";
      default:
        return "-"; // No icon for other statuses
    }
  };
  // Handle change in the measured value input
  const handleMeasuredValueChange = (experimentId: number, value: string) => {
    setMeasuredValues((prevValues) => ({
      ...prevValues,
      [experimentId]: parseFloat(value),
    }));
  };

  const handleExecute = async (experimentId: number) => {
    const measuredValue = measuredValues[experimentId];

    if (!measuredValue) {
      alert("Please enter a valid measured value.");
      return;
    }

    try {
      await experimentService.createExperiment({
        type: 0,
        name: `Experiment with measured value ${experimentId}`,
        ligand_smiles:
          experiments.find((e) => e.id === experimentId)?.ligand_smiles || "",
        measured_value: measuredValue,
        job_id: jobId,
      });
      alert("Experiment executed successfully!");
      // Optionally, refetch experiments or update the UI after creating the experiment
    } catch (error) {
      console.error("Failed to execute experiment:", error);
      alert("Failed to execute experiment.");
    }
  };

  return (
    <Wrapper>
      <Header label="AIGENDRUG" />
      <div className="JobDetailTable mt-10 px-4">
        <div className="Header grid grid-cols-7 gap-4 text-center bg-cus_navy_light p-4 ">
          <span className="font-bold col-span-1 bg-cus_gray py-1 text-cus_navy rounded break-words ">
            Protein A
          </span>
          <span className="font-bold col-span-1">Ligand</span>
          <span className="font-bold col-span-1">예측값</span>
          <span className="font-bold col-span-1">실험값</span>
          <span className="font-bold col-span-1">Status</span>
          <span className="font-bold col-span-1">실행 날짜</span>
          <span className="col-span-1"></span>
        </div>
        <div className="Body pt-4">
          {experiments.map((experiment, index) => (
            <div
              key={experiment.id}
              className="row1 bg-cus_gray text-cus_navy grid grid-cols-7 gap-4 text-center p-4 my-4 items-center rounded-lg"
            >
              <NumBullet
                className="col-span-1"
                label={(index + 1).toString()}
              />
              <span className="col-span-1">{experiment.ligand_smiles}</span>
              <span className="col-span-1">{experiment.predicted_value}</span>

              {experiment.measured_value ? (
                <span className="col-span-1">{experiment.measured_value}</span>
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
              <Button
                className="col-span-1"
                onClick={() => handleExecute(experiment.id)}
              >
                실행
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
