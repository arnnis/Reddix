import getStaticColors from "./static-colors";
import * as themes from "./themes";

export type ThemeKey = keyof typeof themes;

export interface ThemePair {
  id: ThemeKey;
  color?: string;
}

export type StaticThemeColors = ReturnType<typeof getStaticColors>;

export type ThemeColors = StaticThemeColors & {
  rootBackgroundColor: string;
  backgroundColor: string;
};

export interface Theme extends ThemeColors {
  id: ThemeKey;
  displayName: string;
  isDark: boolean;
}
