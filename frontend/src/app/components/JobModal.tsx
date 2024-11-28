"use client";
import { useState } from "react";
import { Button } from "@/app/components/Button";
import { InputBox } from "@/app/components/InputBox";
import { useService } from "@/service/useService";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type JobModalProps = {
  onClose: () => void;
  onJobAdded: () => void;
};

export default function JobModal({ onClose, onJobAdded }: JobModalProps) {
  const { jobService } = useService();
  const [jobName, setJobName] = useState("");
  const [proteinName, setProteinName] = useState("");

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobName) {
      toast.error("Job Name is required.");
      return;
    }
    if (!proteinName) {
      toast.error("Target Protein Name is required.");
      return;
    }

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
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white rounded-lg p-12 shadow-lg w-96">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
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
            <h2 className="text-center text-cus_navy text-2xl font-bold pb-4">
              New Job
            </h2>
            <InputBox
              label="Job Name"
              variant="text"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              hint="*"
            />
            <InputBox
              label="Target Protein Name"
              variant="text"
              value={proteinName}
              onChange={(e) => setProteinName(e.target.value)}
              hint="*"
            />
            <InputBox label="Upload Ligand List" />
            <div className="pt-10">
              <Button className="w-full text-2xl" type="submit">
                Add
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
