"use client";
import { useState } from "react";
import { Button } from "@/app/components/Button";
import { InputBox } from "@/app/components/InputBox";
import Image from "next/image";

type ExperimentModalProps = {
  onClose: () => void;
  onCreateExperiment: (ligand: string) => void;
};

export default function ExperimentModal({
  onClose,
  onCreateExperiment,
}: ExperimentModalProps) {
  const [ligand, setLigand] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLigand(e.target.value);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (ligand) {
      onCreateExperiment(ligand);
    } else {
      alert("Please enter a ligand string.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg p-16 shadow-lg w-96">
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
          <InputBox
            className="text-cus_gray_light"
            label="Ligand SMILES 입력"
            variant="text"
            value={ligand}
            onChange={handleChange}
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
