import React from "react";
import * as themes from "./themes";

const ThemeContext = React.createContext({
  theme: themes.lightWhite,
  toggleTheme: () => {},
});

export default ThemeContext;
