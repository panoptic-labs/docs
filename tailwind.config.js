module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        textColor: ['group-hover'],
        colors: {
          'panoptic-purple': '#4E14D0',
        }
      },
    },
    plugins: [],
    corePlugins: {
      preflight: false,
    }
  };