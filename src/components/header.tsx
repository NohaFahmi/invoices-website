import { useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import "../utils/styles/components/header.scss";
import { Button } from "antd";
import {BsFillSunFill, BsFillMoonFill} from "react-icons/bs";

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
    <div className="header-container">
      <div className="logo-wrapper">
        <img
          src={process.env.PUBLIC_URL + "/images/logo.svg"}
          alt="invoice-logo"
        />
      </div>
      <div className='header-lower-section'>
          <Button type='text' onClick={toggleDarkMode} className='theme-btn'>
              {isDarkMode ?
                  <BsFillSunFill fill='#7e88c3' size='30px'/>
                  :
                  <BsFillMoonFill fill='#7e88c3' size='30px'/>}
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
