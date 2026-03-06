import Router from "./components/Router/Router";
import './App.css'
import { useState, useEffect } from "react";
import { MemoryRouter } from "react-router-dom";

//Contexts
import { ThemeContext } from "./contexts/ThemeContext";
import { TokensContext } from "./contexts/TokensContext";
import { HolderContext } from "./contexts/HolderContext";

function App() {
  const [theme, setTheme] = useState("light");
  const [tokenSet, setTokenSet] = useState([]);
  const [selectedHolder, setSelectedHolder] = useState(1); //Default holder is id=1

  useEffect(() => {
      const handleBeforeUnload = (e) => {
          e.preventDefault();
          e.returnValue = '';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
      };
  }, []);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <TokensContext.Provider value={{tokenSet, setTokenSet}}>
        <HolderContext.Provider value={{selectedHolder, setSelectedHolder}}>
          <MemoryRouter initialEntries={["/"]}>
            <Router />
          </MemoryRouter>
        </HolderContext.Provider>
      </TokensContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
