"use client";
import { Button } from "@/app/components/Button";
import { InputBox } from "@/app/components/InputBox";
import Image from "next/image";
type JobModalProps = {
  onClose: () => void;
};
export default function JobModal({ onClose }: JobModalProps) {
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
        <form className="flex flex-col space-y-5">
          <InputBox
            className="text-cus_gray_light"
            label="Job 이름"
            variant="text"
          />
          <InputBox
            className="text-cus_gray_light"
            label="Target Protein 이름"
            variant="text"
          />
          <div className="pt-10">
            <Button className="w-full">추가</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
