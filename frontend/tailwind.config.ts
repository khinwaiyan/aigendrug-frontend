import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cus_navy: "#10162E",
        cus_navy_light: "#121B3F",
        cus_gray: "#EDE8F5",
        cus_gray_light: "#636363",
        cus_yellow: "#F6B034",
        cus_yellow_light: "#FFDDA0",
        cus_red: "#F31941",
        cus_green: "#1AF665",
        cus_white: "#FEFEFE",
        btn_gray: "#ADBBDA",
      },
      fontFamily: {
        heading: ["Work Sans", "sans-serif"],
        body: ["Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
