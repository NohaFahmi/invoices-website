import { useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";

const Header = () => {
  const toggleDarkMode = () => {
    setIsDarkMode((previous) => {
      switcher({ theme: previous ? themes.light : themes.dark });
      return !previous;
    });
  };
  const { switcher, themes, currentTheme, status } = useThemeSwitcher();
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div>
      <h1
        style={{
          color: "var(--color-primary)",
        }}
      >
        Hello
      </h1>
      <button onClick={toggleDarkMode}>Switch</button>
    </div>
  );
};
export default Header;
