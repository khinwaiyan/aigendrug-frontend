"use client";
import { useState } from "react";
import { Button } from "@/app/components/Button";
import { InputBox } from "@/app/components/InputBox";
import Image from "next/image";
import { useServiceContext } from "@/service/ServiceContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SpinnerLoading } from "@/app/components/Loading";

type ExperimentModalProps = {
  jobId: number;
  onClose: () => void;
  onExperimentAdded?: () => void;
};

export default function ExperimentModal({
  jobId,
  onClose,
  onExperimentAdded,
}: ExperimentModalProps) {
  const [ligand, setLigand] = useState("");
  const [name, setName] = useState("");
  const [measuredValue, setMeasuredValue] = useState<number | undefined>();
  const { experimentService } = useServiceContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleLigandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLigand(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleMeasuredValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setMeasuredValue(value ? parseFloat(value) : undefined);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name) {
      toast.error("실험 이름이 필요합니다.");
      return;
    }
    if (!ligand) {
      toast.error("Ligand SMILES가 필요합니다.");
      return;
    }

    try {
      await experimentService.createExperiment({
        type: 1,
        name: name,
        ligand_smiles: ligand,
        measured_value: measuredValue ?? 0,
        job_id: jobId,
      });

      onExperimentAdded?.();
      onClose();
    } catch (error) {
      console.error("Failed to create experiment:", error);
      toast.error("실험 생성에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg p-12 shadow-lg w-96">
        {isLoading && <SpinnerLoading />}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <Image
            src="/icons/cancel.svg"
            alt="Cancel Icon"
            width={28}
            height={28}
          />
        </button>
        <form className="flex flex-col space-y-5" onSubmit={handleCreate}>
          <h2 className="text-center text-cus_navy text-2xl font-bold pb-4">
            New Experiment
          </h2>
          <InputBox
            label="실험 이름"
            variant="text"
            value={name}
            onChange={handleNameChange}
            hint="*"
          />
          <InputBox
            className="text-cus_gray_light"
            label="Ligand SMILES 입력"
            variant="text"
            value={ligand}
            onChange={handleLigandChange}
            hint="*"
          />
          <InputBox
            className="text-cus_gray_light"
            label="실험값"
            variant="number"
            value={measuredValue?.toString() || ""}
            onChange={handleMeasuredValueChange}
          />
          <div className="pt-10">
            <Button className="w-full" type="submit">
              추가
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
