module.exports = {
  content: ["./packages/renderer/index.html", "./packages/renderer/src/**/*.{html,tsx,css,ts,}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
}
