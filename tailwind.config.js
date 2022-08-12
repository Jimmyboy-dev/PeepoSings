module.exports = {
  content: ['./index.html', './packages/renderer/**/*.{html,tsx,css,ts}'],
  theme: { extend: {} },
  plugins: [require('daisyui')],
}
