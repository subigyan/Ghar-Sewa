module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: '"Roboto", "sans-serif"',
        poppins: '"Poppins", "sans-serif"',
        smooch: "'Smooch Sans', sans-serif",
        montserrat: "'Montserrat', sans-serif",
        nunito: "'Nunito', sans-serif",
        oswald: "'Oswald', sans-serif",
      },
      colors: {
        primary: "#3B3B3B",
        light_gray: "#F5F0EF",
        brown_gray: "#C6BCC1",
        dark: "#212121",
        dark_green: "#515933",
        brown: "#C47F57",
        admin_dark: "#060606",
        admin_light: "#F8F8F9",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
  ],
};
