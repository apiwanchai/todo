import type { ThemeConfig } from "antd";
import { Noto_Sans_Thai } from "next/font/google";

const font = Noto_Sans_Thai({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const theme: ThemeConfig = {
  token: {
    colorPrimary: "#0060A8",
    lineHeight: 1.25,
    lineHeightSM: 1.833333,
    fontFamily: font.style.fontFamily,
    sizeUnit: 4,
    borderRadius: 4,
    fontWeightStrong: 600,
    lineHeightHeading2: 0,
  },
  components: {
    Tag: {
      defaultBg: "#0060A8",
      colorBorder: "#0060A8",
      colorText: "#fff",
    },
  },
  hashed: true,
};