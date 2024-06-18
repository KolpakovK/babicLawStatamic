/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/**/*.antlers.html',
        './resources/**/*.antlers.php',
        './resources/**/*.blade.php',
        './resources/**/*.vue',
        './content/**/*.md',
    ],

    theme: {
        fontFamily:{
            'display': ['Geologica', 'system-ui'],
            'body': ['Afacad', 'system-ui'],
        },

        container: {
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '0rem',
                xl: '0rem',
                '2xl': '0rem',
            },
        },

        extend: {
            colors:{
                'blue': {
                    '50': '#f0f5fe',
                    '100': '#dde7fc',
                    '200': '#c2d6fb',
                    '300': '#98bcf8',
                    '400': '#6899f2',
                    '500': '#4474ed',
                    '600': '#2850e0',
                    '700': '#2642cf',
                    '800': '#2537a8',
                    '900': '#233485',
                    '950': '#1a2251',
                },  
                'black':"#0C0C0C",       
            }
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
    ],
};
