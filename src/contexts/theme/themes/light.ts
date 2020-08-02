import { Theme } from "../types";
import getStaticColor from "../static-colors";

export const lightWhite: Theme = {
  id: "lightWhite",
  isDark: false,
  displayName: "Light White",
  rootBackgroundColor: "#f2f3f5",
  backgroundColor: "#fff",
  textColor: "#34495e",
  textColor2: "#7c7c7c",
  textColor3: "#828282",
  ...getStaticColor(false),
};
