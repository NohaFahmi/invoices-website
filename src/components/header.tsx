import { useContext } from "react";
import "../utils/styles/components/header.scss";
import { Button } from "antd";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { ThemeContext, IThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { theme, dispatchThemeEvent } = useContext<IThemeContext>(ThemeContext);
  const toggleDarkMode = () => {
    dispatchThemeEvent({
      type: "TOGGLE_THEME",
      payload: theme === "dark" ? "light" : "dark",
    });
  };
  return (
    <div className="header-container">
      <div className="logo-wrapper">
        <img
          src={process.env.PUBLIC_URL + "/images/logo.svg"}
          alt="invoice-logo"
        />
      </div>
      <div className="header-lower-section">
        <Button type="text" onClick={toggleDarkMode} className="theme-btn">
          {theme === "dark" ? (
            <BsFillSunFill fill="#7e88c3" size="30px" />
          ) : (
            <BsFillMoonFill fill="#7e88c3" size="30px" />
          )}
        </Button>
        <div className="avatar-wrapper">
          <img
            src={process.env.PUBLIC_URL + "/images/image-avatar.jpg"}
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
