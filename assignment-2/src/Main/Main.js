import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

import "./Main.css";

const Main = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>

      <main id="main" className={`theme-${theme}`}>
        {children}
      </main>
    </>
  );
};

export default Main;
