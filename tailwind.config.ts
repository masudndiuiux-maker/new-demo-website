import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink:'#172033', orange:'#F15A24', cream:'#FFF8EF', mist:'#F4F5F7' }, fontFamily:{sans:['var(--font-jp)','sans-serif']}, boxShadow:{soft:'0 18px 50px rgba(23,32,51,.09)'} } }, plugins: [] } satisfies Config;
