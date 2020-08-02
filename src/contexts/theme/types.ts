import getStaticColors from "./static-colors";
import * as themes from "./themes";

export type ThemeKey = keyof typeof themes;

export type StaticThemeColors = ReturnType<typeof getStaticColors>;

export type ThemeColors = StaticThemeColors & {
  rootBackgroundColor: string;
  backgroundColor: string;
  textColor: string;
  textColor2: string;
  textColor3: string;
};

export interface Theme extends ThemeColors {
  id: ThemeKey;
  displayName: string;
  isDark: boolean;
}
