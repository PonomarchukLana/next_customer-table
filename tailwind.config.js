/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        accent: "var(--accent-color)",
        secondary: "var(--secondary-color) / <alpha-value>",
        text: "var(--color-text) / <alpha-value>",
        success: "var(--color-success) / <alpha-value>",
        warn: "var(--color-warn) / <alpha-value>",
        error: "var(--color-error) / <alpha-value>",
        transparent: "transparent",
        current: "currentColor",
      },
    },
  },
};
