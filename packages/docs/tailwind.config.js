const prevConfig = require("../../tailwind.config")
const { merge } = require("lodash")
/**
 * @type {import("tailwindcss/tailwind-config").TailwindConfig}
 */
const cfg = merge(prevConfig, {
  content: ["./index.html", "./src/**/*.{html,tsx,css,ts,}"],
  theme: {
    extend: {
      colors: {
        darkMode: true,
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require("daisyui")],
})

module.exports = cfg
