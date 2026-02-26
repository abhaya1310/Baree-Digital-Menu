import React, { useState } from 'react';
import MenuScreen from './screens/MenuScreen';
import SpecialsScreen from './screens/SpecialsScreen';
import DrinksScreen from './screens/DrinksScreen';
import TobaccoScreen from './screens/TobaccoScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'specials' | 'menu' | 'drinks' | 'tobacco'>('specials');

  return (
    <>
      {currentScreen === 'specials' ? (
        <SpecialsScreen onNavigateToMenu={() => setCurrentScreen('menu')} />
      ) : currentScreen === 'menu' ? (
        <MenuScreen
          onNavigateToSpecials={() => setCurrentScreen('specials')}
          onNavigateToDrinks={() => setCurrentScreen('drinks')}
          onNavigateToTobacco={() => setCurrentScreen('tobacco')}
        />
      ) : currentScreen === 'drinks' ? (
        <DrinksScreen
          onNavigateToSpecials={() => setCurrentScreen('specials')}
          onNavigateToFood={() => setCurrentScreen('menu')}
          onNavigateToTobacco={() => setCurrentScreen('tobacco')}
        />
      ) : (
        <TobaccoScreen
          onNavigateToSpecials={() => setCurrentScreen('specials')}
          onNavigateToFood={() => setCurrentScreen('menu')}
          onNavigateToDrinks={() => setCurrentScreen('drinks')}
        />
      )}
    </>
  );
}

export default App;
