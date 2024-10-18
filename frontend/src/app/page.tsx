"use client";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Wrapper } from "./components/Wrapper";

// `app/page.tsx` is the UI for the `/` URL
export default function Home() {
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
            <a href="#" className="text-yellow-400 col-span-1 hover:underline">
              View
            </a>
          </div>
          <div className="row 2 grid grid-cols-6 gap-4 text-center p-4 items-center border-b border-cus_gray_light">
            <span className="col-span-1">Job 2</span>
            <span className="col-span-1">Protein B</span>
            <span className="col-span-1 text-green-500">Completed</span>
            <span className="col-span-1">2024-09-15</span>
            <span className="col-span-1">1min 30s</span>
            <a href="#" className="text-yellow-400 col-span-1 hover:underline">
              View
            </a>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button>{"Job 추가 +"}</Button>
        </div>
      </div>
    </Wrapper>
  );
}
