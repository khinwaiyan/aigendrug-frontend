"use client";

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center gap-3 p-3 ">
      <div className="relative h-20 flex items-center justify-center space-x-2 text-6xl font-bold">
        <h1 className="flex space-x-1">
          <span className="animate-updown-1 text-cus_yellow_light">A</span>
          <span className="animate-updown-2 text-pink-300">I</span>
          <span className="animate-updown-3 text-sky-300">G</span>
          <span className="animate-updown-4 text-teal-300">E</span>
          <span className="animate-updown-5 text-orange">N</span>
          <span className="animate-updown-6 "></span>
          <span className="animate-updown-7 text-cus_yellow_light">D</span>
          <span className="animate-updown-8 text-pink-300">R</span>
          <span className="animate-updown-9 text-sky-300">U</span>
          <span className="animate-updown-10 text-teal-300">G</span>
        </h1>
      </div>
      <p className="mt-4 text-lg text-cus_yellow_light">
        로딩중... 잠시만 기다려주세요.
      </p>
      <div className="flex-col">
        <p className="mt-2 text-sm text-cus_yellow_light ">😀 F조</p>
        <p className="mt-2 text-sm text-cus_yellow_light animate-slide-up ">
          이동현, 킨웨이얀, 양길모
        </p>
      </div>
    </div>
  );
};

export const SpinnerLoading = () => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center  bg-cus_navy_light bg-opacity-75 rounded-lg">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cus_yellow"></div>
    </div>
  );
};
