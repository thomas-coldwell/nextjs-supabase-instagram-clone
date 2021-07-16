module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "screen-vp": "calc(var(--vh, 1vh) * 100);",
      },
      minHeight: {
        "screen-vp": "calc(var(--vh, 1vh) * 100);",
      },
      screens: {
        xs: "512px",
      },
      width: {
        "lg-1": "128px",
        "lg-2": "256px",
        "lg-3": "384px",
        "lg-4": "512px",
      },
      height: {
        "lg-1": "128px",
        "lg-2": "256px",
        "lg-3": "384px",
        "lg-4": "512px",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
