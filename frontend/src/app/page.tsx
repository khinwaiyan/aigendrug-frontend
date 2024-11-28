"use client";
import Image from "next/image";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Wrapper } from "./components/Wrapper";
import Link from "next/link";
import JobModal from "./components/JobModal";
import { useCallback, useState, useEffect } from "react";
import { useService } from "@/service/useService";
import { Job } from "@/service/job/interface";
import { formatDate } from "@/utils/formatTime";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const { jobService } = useService();

  const fetchJobs = useCallback(async () => {
    try {
      const jobList = await jobService.getAllJobs();
      setJobs(jobList);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  }, [jobService]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const openJobModal = () => {
    setIsModalOpen(true);
  };

  const closeJobModal = () => {
    setIsModalOpen(false);
  };

  const handleJobAdded = () => {
    fetchJobs();
    toast.success("Job added successfully");
  };
  const handleDeleteJob = async (id: number) => {
    if (confirm("Are you sure you want to delete this job?")) {
      try {
        await jobService.deleteJob(id);
        fetchJobs();
        toast.success("Job deleted successfully");
      } catch (error) {
        console.error("Failed to delete job:", error);
        toast.error("Failed to delete job");
      }
    }
  };
  return (
    <Wrapper>
      <Header label="AIGENDRUG" />
      <ToastContainer position="top-center" />
      <div className="JobTable mt-8">
        <div className="TableHeader grid grid-cols-5 gap-4 text-center bg-cus_navy_light p-4 rounded-lg">
          <span className="font-bold col-span-1">Job</span>
          <span className="font-bold col-span-1">Protein</span>
          <span className="font-bold col-span-1">Start Date</span>
          <span className="font-bold col-span-1 text-yellow-400">Details</span>
          <span className="col-span-1 flex justify-center"></span>
        </div>
        <div className="TableBody rounded-lg mt-2">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="row1 grid grid-cols-5 gap-4 text-center p-4 items-center border-b border-cus_gray_light"
            >
              <span className="col-span-1">{job.name}</span>
              <span className="col-span-1">{job.target_protein_name}</span>
              <span className="col-span-1">{formatDate(job.created_at)}</span>
              <Link
                href={`/job/${job.id}`}
                className="text-yellow-400 col-span-1 hover:underline"
              >
                View
              </Link>
              <span className="col-span-1 flex justify-center">
                <div
                  onClick={() => handleDeleteJob(job.id)}
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
        <div className="mt-6 flex justify-end">
          <Button onClick={openJobModal}>
            {"Add Job  "}
            <Image
              src="/icons/plus.svg"
              alt="Plus icon"
              width={16}
              height={16}
              className="inline-block"
            />
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <JobModal onClose={closeJobModal} onJobAdded={handleJobAdded} />
      )}
    </Wrapper>
  );
}
