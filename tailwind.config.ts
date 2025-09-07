/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		animation: {
		  'slide-in': 'slide-in 0.8s ease-out forwards',
		  'float': 'float 3s ease-in-out infinite',
		  'spin-slow': 'spin-slow 4s linear infinite',
		  'flash': 'flash 0.3s ease-in-out',
		  'manga-zoom': 'manga-zoom 2s ease-in-out infinite',
		  'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
		  'bounce-cute': 'bounce-cute 2s infinite'
		},
		keyframes: {
		  'slide-in': {
			'0%': { transform: 'translateX(100%)', opacity: '0' },
			'100%': { transform: 'translateX(0)', opacity: '1' }
		  },
		  'float': {
			'0%, 100%': { transform: 'translateY(0px)' },
			'50%': { transform: 'translateY(-15px)' }
		  },
		  'spin-slow': {
			'from': { transform: 'rotate(0deg)' },
			'to': { transform: 'rotate(360deg)' }
		  },
		  'flash': {
			'0%, 100%': { opacity: '0' },
			'50%': { opacity: '1' }
		  },
		  'manga-zoom': {
			'0%': { transform: 'scale(1)' },
			'50%': { transform: 'scale(1.1)' },
			'100%': { transform: 'scale(1)' }
		  },
		  'fade-in-up': {
			'0%': { opacity: '0', transform: 'translateY(30px)' },
			'100%': { opacity: '1', transform: 'translateY(0)' }
		  },
		  'bounce-cute': {
			'0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
			'40%, 43%': { transform: 'translateY(-15px)' },
			'70%': { transform: 'translateY(-7px)' },
			'90%': { transform: 'translateY(-3px)' }
		  }
		}
	  }
	},
	plugins: [],
  }
  