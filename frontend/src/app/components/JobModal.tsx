"use client";
import { useState } from "react";
import { Button } from "@/app/components/Button";
import { InputBox } from "@/app/components/InputBox";
import { useService } from "@/service/useService";
import Image from "next/image";

type JobModalProps = {
  onClose: () => void;
  onJobAdded: () => void; // Callback to notify the parent component when a job is added
};

export default function JobModal({ onClose, onJobAdded }: JobModalProps) {
  const { jobService } = useService();
  const [jobName, setJobName] = useState("");
  const [proteinName, setProteinName] = useState("");

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await jobService.createJob({
        name: jobName,
        target_protein_name: proteinName,
      });
      onJobAdded();
      onClose();
    } catch (error) {
      console.error("Failed to create job:", error);
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
        <form className="flex flex-col space-y-5" onSubmit={handleJobSubmit}>
          <InputBox
            className="text-cus_gray_light"
            label="Job 이름"
            variant="text"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
          />
          <InputBox
            className="text-cus_gray_light"
            label="Target Protein 이름"
            variant="text"
            value={proteinName}
            onChange={(e) => setProteinName(e.target.value)}
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
