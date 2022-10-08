import React, { useReducer, ReactElement, Reducer, Dispatch } from "react";
import { useEffect } from "react";

export interface IThemeContextActions {
  type: string;
  payload: string;
}

export interface IThemeContext {
  theme: string;
  dispatchThemeEvent: Dispatch<IThemeContextActions>;
}

export const ThemeContext = React.createContext<IThemeContext>({
  theme: "dark",
  dispatchThemeEvent: () => {},
});

const initialTheme: string | null = localStorage.getItem("theme");

const reducer = (state: string, action: IThemeContextActions): string => {
  if (action.type === "TOGGLE_THEME") {
    saveThemToLocalStorage(action.payload);
    switchDataTheme(action.payload);
    return action.payload;
  }
  return state;
};

const saveThemToLocalStorage = (theme: string) => {
  let currentTheme = localStorage.getItem("theme");
  if (currentTheme && theme !== currentTheme) {
    localStorage.setItem("theme", theme);
  }
};

export const switchDataTheme = (theme?: string) => {
  if (document && document.firstElementChild) {
    document.firstElementChild.setAttribute(
      "data-theme",
      theme ? theme : initialTheme ? initialTheme : "dark"
    );
  }
};

export const ThemeContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [currentTheme, dispatchToggleTheme] = useReducer<
    Reducer<string, IThemeContextActions>
  >(reducer, initialTheme ? initialTheme : "dark");

  return (
    <ThemeContext.Provider
      value={{ theme: currentTheme, dispatchThemeEvent: dispatchToggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
