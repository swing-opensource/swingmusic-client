import { defineStore } from "pinia";
// @ts-ignore
import { brightness } from "@nextcss/color-tools";
import rgb2Hex from "@/utils/colortools/rgb2Hex";

export default defineStore("SwingMusicColors", {
  state: () => ({
    theme1: "",
  }),
  actions: {
    setTheme1Color(color: string) {
      this.theme1 = color;
    },
  },
  persist: true,
});