"use client";
import { Button } from "@/app/components/Button";
import { Header } from "@/app/components/Header";
import { Wrapper } from "@/app/components/Wrapper";
import { NumBullet } from "@/app/components/NumBullet";
import { TbLoader3 } from "react-icons/tb";
// import { FaCheckCircle } from "react-icons/fa";
import { InputBox } from "@/app/components/InputBox";
// import { FaExclamation } from "react-icons/fa";

export default function JobDetail() {
  const handleLogOut = () => {
    console.log("Logout Button clicked!");
  };
  return (
    <Wrapper>
      <Header
        headerLabel="웨이님 반가워요!"
        btnText="로그아웃"
        onClick={handleLogOut}
      />
      <div className="JobDetailTable mt-8">
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
        <div className="Body">
          <div className="row1 bg-cus_gray text-cus_navy grid grid-cols-7 gap-4 text-center p-4 my-4 items-center rounded-lg">
            <NumBullet className="col-span-1" label="1"></NumBullet>
            <span className="col-span-1">ligand1</span>
            <span className="col-span-1">0.9</span>
            <input
              type="number"
              placeholder="실험값"
              step="any"
              min="0"
              max="1"
              className="col-span-1 py-1 border-2 border-cus_yellow text-cus_gray_light text-center rounded-md cursor-pointer"
            />
            <span className="col-span-1 flex justify-center">
              <TbLoader3
                className="animate-spin col-span-1 text-cus_yellow "
                size={28}
              />
            </span>
            <span className="col-span-1">2024-09-15</span>
            <Button className="col-span-1">실행</Button>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <InputBox label="Ligand 업로드 (리스트)" />
      </div>
    </Wrapper>
  );
}
