module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#425ADF',
        success: '#10B981',
        danger: '#EF4444',
        accent: '#A4A4A4',
        'bg-light': '#F9FAFB',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(156 163 175 / 0.1), 0 1px 2px 0 rgb(156 163 175 / 0.06)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
    },
  },
  plugins: [],
};
