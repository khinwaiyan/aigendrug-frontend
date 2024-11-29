"use client";
import { useState } from "react";
import { Button } from "@/app/components/Button";
import { InputBox } from "@/app/components/InputBox";
import { useServiceContext } from "@/service/ServiceContext";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JobFile } from "@/service/job/interface";

type JobModalProps = {
  onClose: () => void;
  onJobAdded: () => void;
};

export default function JobModal({ onClose, onJobAdded }: JobModalProps) {
  const { jobService } = useServiceContext();
  const [jobName, setJobName] = useState("");
  const [proteinName, setProteinName] = useState("");
  const [ligandFile, setLigandFile] = useState<File | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);

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
    if (!ligandFile) {
      toast.error("Ligand List file is required.");
      return;
    }

    if (!ligandFile.name.toLowerCase().endsWith(".csv")) {
      toast.error("Please upload a CSV file");
      return;
    }

    try {
      const jobResponse = await jobService.createJob({
        name: jobName,
        target_protein_name: proteinName,
      });

      if (!jobResponse || !jobResponse.id) {
        toast.error("Invalid response from server when creating job");
        return;
      }

      try {
        const jobFile: JobFile = {
          id: jobResponse.id,
          file: new FormData(),
        };
        jobFile.file.append("file", ligandFile);

        await jobService.uploadLigandFile(jobFile);
        onJobAdded();
        onClose();
      } catch (error) {
        console.error("File upload error details:", error);
        toast.error(`Failed to upload ligand file:`);
        try {
          await jobService.deleteJob(jobResponse.id);
        } catch {
          console.error("Failed to cleanup job after file upload error");
        }
      }
    } catch (error) {
      console.error("Job creation error details:", error);
      toast.error(`Failed to create job`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setLigandFile(file);
    setFileUploaded(!!file);
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
            />
            <InputBox
              label="Target Protein Name"
              variant="text"
              value={proteinName}
              onChange={(e) => setProteinName(e.target.value)}
            />
            <div className="relative">
              <InputBox
                label="Upload Ligand List"
                variant="file"
                onChange={handleFileChange}
                hint="(CSV file)"
              />
              {fileUploaded && ligandFile && (
                <div className="mt-2 flex items-center justify-center text-green-600">
                  <Image
                    src="/icons/checkCircle.svg"
                    alt="Upload Complete"
                    width={20}
                    height={20}
                  />
                  <span className="ml-2">{ligandFile.name} uploaded</span>
                </div>
              )}
            </div>
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
