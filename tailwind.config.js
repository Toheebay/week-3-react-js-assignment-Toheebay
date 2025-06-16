module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    darkMode: 'class', // Use class-based dark mode
    theme: {
      extend: {
        animation: {
          fadeIn: "fadeIn 1s ease-in-out",
        },
        keyframes: {
          fadeIn: {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        },
      },
    },
    plugins: [],
  };
  