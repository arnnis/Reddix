import { Theme } from "../types";
import getStaticColor from "../static-colors";

export const lightWhite: Theme = {
  id: "lightWhite",
  isDark: false,
  displayName: "Light White",
  rootBackgroundColor: "#f2f3f5",
  backgroundColor: "#fff",
  textColor: "#34495e",
  textColorLess: "#7c7c7c",
  ...getStaticColor(false),
};
