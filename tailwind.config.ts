import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'poppins': ['Poppins', 'sans-serif'],
				'devanagari': ['Noto Sans Devanagari', 'sans-serif'],
				'kalam' :["Kalam", "cursive"],
				'Playpen':["Playpen Sans Deva","cursive"],
				'Rock' : ["Rock Salt", "cursive"]
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				dhaba: {
					gold: 'hsl(var(--dhaba-gold))',
					'gold-light': 'hsl(var(--dhaba-gold-light))',
					'gold-dark': 'hsl(var(--dhaba-gold-dark))',
					amber: 'hsl(var(--dhaba-amber))',
					copper: 'hsl(var(--dhaba-copper))',
					charcoal: 'hsl(var(--dhaba-charcoal))',
					'charcoal-light': 'hsl(var(--dhaba-charcoal-light))',
					'charcoal-medium': 'hsl(var(--dhaba-charcoal-medium))',
					cream: 'hsl(var(--dhaba-cream))',
					'cream-warm': 'hsl(var(--dhaba-cream-warm))',
					'spice-red': 'hsl(var(--dhaba-spice-red))',
					'tandoor-orange': 'hsl(var(--dhaba-tandoor-orange))',
					mint: 'hsl(var(--dhaba-mint))',
					'premium-black': 'hsl(var(--dhaba-premium-black))',
					glass: 'hsl(var(--dhaba-glass))'
				}
			},
			backgroundImage: {
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-warm': 'var(--gradient-warm)',
				'gradient-tandoor': 'var(--gradient-tandoor)',
				'gradient-metal': 'var(--gradient-metal)',
				'gradient-glass': 'var(--gradient-glass)',
				'gradient-navbar': 'var(--gradient-navbar)'
			},
			boxShadow: {
				'warm': 'var(--shadow-warm)',
				'deep': 'var(--shadow-deep)',
				'glow': 'var(--shadow-glow)',
				'card': 'var(--shadow-card)',
				'premium': 'var(--shadow-premium)'
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'elegant': 'cubic-bezier(0.4, 0, 0.2, 1)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

