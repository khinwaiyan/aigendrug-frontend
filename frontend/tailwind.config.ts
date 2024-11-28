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
      keyframes: {
        moveUpDown: {
          "0%, 50%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-10px)" },
        },
        slideInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bottonSheetUp: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(100%)" },
        },
        popup: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        popout: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.8)" },
        },
      },
      animation: {
        "updown-1": "moveUpDown 2s infinite ease-in-out 0.1s",
        "updown-2": "moveUpDown 2s infinite ease-in-out 0.3s",
        "updown-3": "moveUpDown 2s infinite ease-in-out 0.5s",
        "updown-4": "moveUpDown 2s infinite ease-in-out 0.7s",
        "updown-5": "moveUpDown 2s infinite ease-in-out 0.9s",
        "updown-6": "moveUpDown 2s infinite ease-in-out 1.1s",
        "updown-7": "moveUpDown 2s infinite ease-in-out 1.3s",
        "updown-8": "moveUpDown 2s infinite ease-in-out 1.5s",
        "updown-9": "moveUpDown 2s infinite ease-in-out 1.7s",
        "updown-10": "moveUpDown 2s infinite ease-in-out 1.9s",
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
