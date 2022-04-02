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
        primary: "#fedba5",
        light_ay: "#F5F0EF",
        brown_gray: "#C6BCC1",
        dark: "#212121",
        dark_green: "#515933",
        brown: "#C47F57",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
