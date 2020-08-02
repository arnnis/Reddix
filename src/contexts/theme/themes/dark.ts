import { Theme, ThemeColors } from "../types";
import getStaticColor from "../static-colors";

export const darkBlack: Theme = {
  id: "darkBlack",
  isDark: true,
  displayName: "Dark black",
  rootBackgroundColor: "#33363E",
  backgroundColor: "#292B30",
  textColor: "#CECECE",
  textColor2: "#7c7c7c",
  textColor3: "#828282",
  ...getStaticColor(false),
};
