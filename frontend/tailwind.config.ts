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
        bg: "#10162E",
        bg_navy: "#121B3F",
        bg_gray: "#EDE8F5",
        cus_yellow: "#F6B034",
        cus_red: "#F31941",
        cus_green: "#1AF665",
        btn_gray: "#ADBBDA",
        text_white: "#FEFEFE",
        text_gray: "#636363",
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
