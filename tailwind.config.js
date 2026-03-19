module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        textColor: ['group-hover'],
        colors: {
          'panoptic-purple': '#4E14D0',
          'panoptic-purple-light': '#7B3FE4',
          'panoptic-purple-dark': '#3A0FA0',
          'dark-bg': '#0A0118',
          'dark-surface': '#130828',
          'dark-surface-2': '#1A0E35',
          'dark-border': '#2A1A4E',
          'glow-purple': '#7B3FE4',
          'glow-green': '#28CB95',
        },
        fontFamily: {
          display: ['"Space Grotesk Variable"', '"Space Grotesk"', 'sans-serif'],
          body: ['Inter', 'sans-serif'],
          mono: ['"JetBrains Mono"', 'monospace'],
        },
        fontSize: {
          'hero': 'clamp(3rem, 6vw, 5.75rem)',
          'section': 'clamp(2rem, 4vw, 3rem)',
          'subtitle': 'clamp(1rem, 2vw, 1.25rem)',
        },
        boxShadow: {
          'glow-sm': '0 0 20px rgba(123, 63, 228, 0.3)',
          'glow-md': '0 0 40px rgba(123, 63, 228, 0.4)',
          'glow-lg': '0 0 80px rgba(123, 63, 228, 0.5)',
          'glow-green': '0 0 30px rgba(40, 203, 149, 0.4)',
        },
        backgroundImage: {
          'gradient-purple': 'linear-gradient(135deg, #4E14D0, #7B3FE4)',
          'gradient-purple-green': 'linear-gradient(135deg, #7B3FE4, #28CB95)',
          'gradient-dark': 'linear-gradient(180deg, #0A0118, #130828)',
        },
        keyframes: {
          'float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
          'pulse-glow': {
            '0%, 100%': { opacity: '0.4' },
            '50%': { opacity: '0.8' },
          },
          'gradient-shift': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'float-slow': 'float 8s ease-in-out infinite',
          'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
          'gradient-shift': 'gradient-shift 8s ease infinite',
        },
      },
    },
    plugins: [],
    corePlugins: {
      preflight: false,
    }
  };
