/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
	screens: {
		sm: '480px',
		md: '768px',
		lg: '976px',
		xl: '1440px'
	},
	extend: {
		colors: {
			"primaryAuthentication": '#453e35',
			"primaryWhite": "#f9fcf8",
			"primaryRegistration": "#817566",
			"primaryGold": "#b0a464",
			"elephantBone": "#fffff0",
			"yellowGreen": "#b4b45d"
		},
		backgroundImage: {
			mainPageGradient: 'linear-gradient(315deg, #65005E 3%, #3C84CE 38%, #30EEE2 68%, #FF1919 98%)'
		},
		animation: {
			gradientAnimation: 'gradientAnimation 15s ease infinite',
			move: 'move 1s infinite alternate',
			bouncingArrow: 'bouncingArrow 1s infinite alternate',
			pulse: 'pulse 2s infinite'
		},
		keyframes: {
			gradientAnimation: {
				'0%, 100%': { backgroundPosition: '0% 0%' },
				'50%': { backgroundPosition: '100% 100%' }
			},
			move: {
				'0%': { transform: 'translateY(0)' },
				'100%': { transform: 'translateY(-10px)' }
			},
			bouncingArrow: {
				'0%': { top: '-0.25rem' },
				'100%': { top: '-0.8rem' }
			},
			pulse: {
				'0%': { boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.7)' },
				'50%': { opacity: 1 },
				'70%': { boxShadow: '0 0 0 30px rgba(255, 255, 255, 0)' },
				'100%': { boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)' }
			}
		},
		boxShadow: {
			md: '0 3px 10px rgba(0, 0, 0, 0.5)',
			card: '0 15px 25px rgba(129, 124, 124, 0.4)',
			form: '0 3px 10px rgb(0 0 0 / 0.4);'
		},
		borderRadius: {
			learnMore: '65% 35% 74% 26% / 58% 63% 37% 42% ',
			formRadius: "20px",
			circle: "50%"
		}
	}
  },
  plugins: [],
}
