import React, { useState, useEffect } from "react";
import MenuScreen from "./screens/MenuScreen";
import SpecialsScreen from "./screens/SpecialsScreen";
import DrinksScreen from "./screens/DrinksScreen";
import TobaccoScreen from "./screens/TobaccoScreen";

function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "specials" | "menu" | "drinks" | "tobacco"
  >("menu");

  // Reset scroll position when screen changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);

  return (
    <>
      {currentScreen === "specials" ? (
        <SpecialsScreen
          key="specials"
          onNavigateToMenu={() => setCurrentScreen("menu")}
        />
      ) : currentScreen === "menu" ? (
        <MenuScreen
          key="menu"
          onNavigateToSpecials={() => setCurrentScreen("specials")}
          onNavigateToDrinks={() => setCurrentScreen("drinks")}
          onNavigateToTobacco={() => setCurrentScreen("tobacco")}
        />
      ) : currentScreen === "drinks" ? (
        <DrinksScreen
          key="drinks"
          onNavigateToSpecials={() => setCurrentScreen("specials")}
          onNavigateToFood={() => setCurrentScreen("menu")}
          onNavigateToTobacco={() => setCurrentScreen("tobacco")}
        />
      ) : (
        <TobaccoScreen
          key="tobacco"
          onNavigateToSpecials={() => setCurrentScreen("specials")}
          onNavigateToFood={() => setCurrentScreen("menu")}
          onNavigateToDrinks={() => setCurrentScreen("drinks")}
        />
      )}
    </>
  );
}

export default App;
