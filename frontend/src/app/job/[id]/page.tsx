"use client";
import { useRouter } from "next/router"; // Import the useRouter hook
import { useState, useEffect } from "react";
import { Button } from "@/app/components/Button";
import { Header } from "@/app/components/Header";
import { Wrapper } from "@/app/components/Wrapper";
import { useService } from "@/service/useService";
import { Experiment } from "@/service/experiment/interface"; // Import the Experiment interface
import { NumBullet } from "@/app/components/NumBullet";
import ExperimentModal from "@/app/components/ExperimentModal";
import Image from "next/image";
import { formatDate } from "@/utils/formatTime";
export default function JobDetail() {
  const router = useRouter();
  const jobId = Number(router.query.id);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const { experimentService } = useService(); // Your service to fetch experiments
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch experiments by jobId
  useEffect(() => {
    if (!isNaN(jobId)) {
      const fetchExperiments = async () => {
        try {
          const experiments = await experimentService.getAllExperimentsByJobId(
            Number(jobId)
          );
          setExperiments(experiments);
        } catch (error) {
          console.error("Failed to fetch experiments:", error);
        }
      };

      fetchExperiments();
    }
  }, [jobId, experimentService]);

  // Handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle creating a new experiment
  const handleCreateExperiment = async (ligand: string) => {
    try {
      await experimentService.createExperiment({
        type: 1, // Set type to 1 because no experiment value is present initially
        name: `New Experiment`, // Use appropriate name logic
        ligand_smiles: ligand,
        measured_value: 0, // If applicable, otherwise set this to null or omit it
        job_id: jobId,
      });
      closeModal(); // Close the modal after creation
    } catch (error) {
      console.error("Failed to create experiment:", error);
    }
  };

  const getIconSrc = (status: number) => {
    switch (status) {
      case 1: // Training
        return "/icons/loader.svg";
      case 2: // Trained
        return "/icons/checkCircle.svg";
      case 3: // Failed
        return "/icons/error.svg";
      default:
        return ""; // No icon for other statuses
    }
  };

  // Display experiment rows
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

              {/* Show experiment value if present, otherwise show an input */}
              {experiment.measured_value ? (
                <span className="col-span-1">{experiment.measured_value}</span>
              ) : (
                <input
                  type="number"
                  placeholder="실험값"
                  step="any"
                  min="0"
                  max="1"
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
              <Button className="col-span-1">실행</Button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Experiment Button */}
      <div className="mt-8 flex justify-end">
        <Button onClick={openModal}>Experiment 추가</Button>
      </div>

      {/* Modal for creating experiments */}
      {isModalOpen && (
        <ExperimentModal
          onClose={closeModal}
          onCreateExperiment={handleCreateExperiment}
        />
      )}
    </Wrapper>
  );
}
