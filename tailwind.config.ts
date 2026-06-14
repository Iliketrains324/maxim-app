import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mx: {
          bg: "#F7F5FC",
          surface: "#FFFFFF",
          "surface-alt": "#EDE7FB",
          text: "#262040",
          secondary: "#6E6788",
          primary: "#6D4AC2",
          "primary-strong": "#4A2F9E",
          accent: "#A77BFF",
          border: "#E4DCF5",
          success: "#2FB87A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        ui: ["var(--font-ui)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
