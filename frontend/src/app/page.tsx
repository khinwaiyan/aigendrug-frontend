"use client";
import Image from "next/image";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Wrapper } from "./components/Wrapper";
import Link from "next/link";
import JobModal from "./components/JobModal";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openJobModal = () => {
    setIsModalOpen(true);
  };

  const closeJobModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      <Header label="AIGENDRUG" />
      <div className="JobTable mt-8">
        <div className="TableHeader grid grid-cols-6 gap-4 text-center bg-cus_navy_light p-4 rounded-lg">
          <span className="font-bold col-span-1">Job</span>
          <span className="font-bold col-span-1">Protein Name</span>
          <span className="font-bold col-span-1">Status</span>
          <span className="font-bold col-span-1">Start time</span>
          <span className="font-bold col-span-1">Duration</span>
          <span className="col-span-1"></span> {/* View button */}
        </div>
        <div className="TableBody rounded-lg mt-2">
          <div className="row1 grid grid-cols-6 gap-4 text-center p-4 items-center border-b border-cus_gray_light">
            <span className="col-span-1">Job 1</span>
            <span className="col-span-1">Protein A</span>
            <span className="col-span-1 text-red-500">Ongoing</span>
            <span className="col-span-1">2024-09-15</span>
            <span className="col-span-1">-</span>
            <Link
              href="/job/2"
              className="text-yellow-400 col-span-1 hover:underline"
            >
              View
            </Link>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={openJobModal}>
            {"Job 추가 "}
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
      {isModalOpen && <JobModal onClose={closeJobModal} />}
    </Wrapper>
  );
}
