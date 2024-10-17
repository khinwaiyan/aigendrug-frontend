"use client";
import { Header } from "./components/Header";

// `app/page.tsx` is the UI for the `/` URL
export default function Home() {
  const handleClick = () => {
    console.log("Button clicked!");
  };
  return (
    <div>
      <Header
        headerLabel="AIGENDRUG"
        btnText="로그아웃"
        onClick={handleClick}
      />
    </div>
  );
}
