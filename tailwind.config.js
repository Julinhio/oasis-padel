/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black: '#1C1C1C',
        anthracite: '#3D3D3D',
        cream: '#F0EAE0',
        sand: '#A09080',
        sun: '#F2C94C',
        white: '#FFFFFF',
      },
      fontFamily: {
        archivo: ['"Archivo Black"', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['24px', '32px'],
        '2xl': ['32px', '40px'],
        '4xl': ['48px', '56px'],
        '6xl': ['72px', '80px'],
        '9xl': ['128px', '1'],
        mega: ['clamp(80px, 12vw, 200px)', '1'],
      },
      spacing: {
        'section-y': 'clamp(80px, 12vw, 160px)',
      },
      letterSpacing: {
        headline: '-0.02em',
        name: '-0.01em',
        micro: '0.1em',
      },
      maxWidth: {
        content: '1440px',
      },
    },
  },
  plugins: [],
}
