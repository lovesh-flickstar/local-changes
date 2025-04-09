module.exports = {
    darkMode: 'class',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: 'rgb(var(--background))',
          text: 'rgb(var(--text))',
          border: 'rgb(var(--border))',
        },
      },
    },
    plugins: [
      // Add plugin for custom utilities
      function({ addUtilities }) {
        addUtilities({
          '.theme-bg': {
            'background-color': 'rgb(var(--background))',
          },
          '.theme-text': {
            color: 'rgb(var(--text))',
          },
          '.theme-border': {
            'border-color': 'rgb(var(--border))',
          },
        })
      }
    ]
  }