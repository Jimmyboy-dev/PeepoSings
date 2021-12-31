import { MantineThemeOverride } from "@mantine/core"
import daisyUI from "daisyui"

const theme: MantineThemeOverride = {
  colorScheme: "dark",
  colors: {
    ...daisyUI.colors,
  },

  headings: {
    fontFamily: "'Lilita One', sans-serif",
    sizes: {
      h1: { fontSize: 30 },
    },
  },
}
export default theme
