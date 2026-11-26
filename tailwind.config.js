/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vermilion: {
          DEFAULT: '#C83E2B',
          dark: '#A62C1E',
          light: '#E35B47',
        },
        gold: {
          DEFAULT: '#E6B450',
          bright: '#F6D277',
          deep: '#B88322',
          soft: '#FDF4DC',
        },
        xuan: {
          DEFAULT: '#FAF5EB',
          warm: '#F3E9D6',
          border: '#E4D3B3',
        },
        ink: {
          DEFAULT: '#3A2618',
          muted: '#7A5C48',
        },
      },
      fontFamily: {
        'serif-cn': ['"Songti SC"', '"Noto Serif SC"', '"STSong"', '"SimSun"', 'Georgia', 'serif'],
        'sans-cn': ['"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
