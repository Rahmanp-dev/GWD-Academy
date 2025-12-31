/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                slate: {
                    950: '#020617', // Deep dark background
                    900: '#0f172a', // Card background
                },
                primary: {
                    500: '#3b82f6', // Blue-500
                    600: '#2563eb',
                },
                success: {
                    500: '#10b981', // Emerald-500
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
