import React from "react";
import "./App.css";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import Header from "./components/header";
import AppContainer from "./components/appContainer";

const themes = {
  light: "./assets/theme.scss",
  dark: "./assets/theme.scss",
};

function App() {
  return (
    <ThemeSwitcherProvider defaultTheme="light" themeMap={themes}>
      <AppContainer></AppContainer>
    </ThemeSwitcherProvider>
  );
}

export default App;
