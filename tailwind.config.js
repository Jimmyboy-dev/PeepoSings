const twitchColors = {
  main: "#9146FF",
  muted: {
    ice: "#F0F0FF",
    jiggle: "#FAB4FF",
    worm: "#FACDCD",
    isabelle: "#FEEE85",
    droid: "#BEFAE1",
    wipeout: "#00C8AF",
    smoke: "#D2D2E6",
    widow: "#BFABFF",
    peach: "#FC6675",
    pacman: "#FFCA5F",
    felicia: "#57BEE6",
    sonic: "#0014A5",
  },
  accent: {
    dragon: "#8205B4",
    cuddle: "#FA1ED2",
    bandit: "#FF6905",
    lightning: "#FAFA19",
    ko: "#BEFF00",
    mega: "#00FAFA",
    nights: "#41145F",
    osu: "#BE0078",
    sniper: "#FA2828",
    egg: "#00FA05",
    legend: "#69FFC3",
    zero: "#1E69FF",
  },
}

module.exports = {
  content: ["./packages/renderer/index.html", "./packages/renderer/src/**/*.{html,tsx,css,ts,}"],
  theme: {
    extend: {
      colors: {
        darkMode: true,
        twitch: twitchColors,
      },
    },
  },
  plugins: [require("daisyui")],
}
