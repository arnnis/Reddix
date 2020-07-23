import { ThemeColors } from "./types";
import getStaticColor from "./static-colors";

export const lightWhite: ThemeColors = {
  rootBackgroundColor: "#f2f3f5",
  backgroundColor: "#fff",
  ...getStaticColor(false),
};
