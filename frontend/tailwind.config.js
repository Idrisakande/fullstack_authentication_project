/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // lightBlue: "#edf2f8",
        // blue: "#313bac",
        // bluryBlue: "rgba(255, 255, 255, 0.25)",
        // borderColor: "rgba(255, 255, 255, 0.18)",
        // boxShadow: "0 4px 30px #4747470b",
        boxShadow: "0 0 25px rgba(0, 0, 0, 0.2)",
        shadow: "-79px 51px 60px rgba(0, 0, 0, 0.08)",
        // shadow: "-79px 51px 60px rgba(0, 0, 0, 0.08)",
        // lightGray: "#e4e4e4",
        // topBtnColor: "#4f46e5",
        // topBtnBgColor: "#1d4ed8",
        // gray: "#6b7688",
        // brown: "#46364a",
        // black: "#030303",
        // white: "#ffffff",
      },
    },
    fontFamily: {
      signature: ["Great Vibes"],
      dmSans: ["DM Sans"],
    },
    screens: {
      xs: "375px",
      ss: "540px",
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1700px",
    },
  },
  plugins: [],
};
