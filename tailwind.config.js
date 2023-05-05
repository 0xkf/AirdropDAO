/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gelato-button": "#1C4BA3",
        "connect-button": "#6519e6",
      },
    },
  },
  theme: {
    extend: {
      backgroundImage: {
        "purple-gradient": "linear-gradient(to bottom, #9F7AEA, #E7E0F9)",
      },
      colors: {
        'twitter': '#1DA1F2',
    }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [ 'dark'],
  },
};
