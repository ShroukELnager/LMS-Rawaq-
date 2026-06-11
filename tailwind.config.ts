module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#006D77",
        secondary: "#D4A373",
        tertiary: "#5E4700",

        surface: "#F9F9FF",
        "surface-container": "#E7EEFF",

        error: "#BA1A1A",
        // sidebar: "#E6E3D0",
        // text: "#48473A",
        // muted: "#48473A80",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      fontSize: {
        "display-lg": ["57px", { lineHeight: "64px", fontWeight: "700" }],
        "headline-md": ["28px", { lineHeight: "36px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "20px", fontWeight: "500" }],
      },

      borderRadius: {
        xl: "16px",
        "2xl": "24px",
      },
    },
  },
  plugins: [],
};