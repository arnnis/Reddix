import React, { Component } from "react";

import ThemeContext from ".";
import * as themes from "./themes";
import { ThemeKey } from "./types";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

interface State {
  themeKey: ThemeKey;
  isLoadingTheme: boolean;
}

class ThemeProvider extends Component<unknown, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      themeKey: "lightWhite",
      isLoadingTheme: true,
    };
  }

  async componentDidMount() {
    let themeKey = (await localStorage.getItem("themeKey")) as ThemeKey;
    themeKey && (await this.setState({ themeKey }));
    this.setState({ isLoadingTheme: false });
  }

  toggleTheme = async (themeKey: ThemeKey) => {
    await this.setState({ themeKey });
    localStorage.setItem("themeKey", themeKey);
  };

  render() {
    let { isLoadingTheme } = this.state;
    return (
      <ThemeContext.Provider
        value={{
          theme: themes[this.state.themeKey],
          toggleTheme: this.toggleTheme,
        }}
      >
        <StyledThemeProvider theme={themes[this.state.themeKey]}>
          {!isLoadingTheme && this.props.children}
        </StyledThemeProvider>
      </ThemeContext.Provider>
    );
  }
}

export default ThemeProvider;
