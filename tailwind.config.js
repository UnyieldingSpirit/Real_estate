/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'Roboto Mono', 'monospace'],
                'als-hauss': ['var(--font-als-hauss)', 'ALS Hauss', 'sans-serif'],
            },
            colors: {
                primary: '#FF6B6B',
            },
            backgroundColor: {
                'light-gray': '#f7f7f7',
            },
            borderRadius: {
                '2xl': '20px',
            },
        },
    },
    plugins: [],
}