import React, { useState } from 'react';
import MenuScreen from './screens/MenuScreen';
import SpecialsScreen from './screens/SpecialsScreen';
import DrinksScreen from './screens/DrinksScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'specials' | 'menu' | 'drinks'>('specials');

  return (
    <>
      {currentScreen === 'specials' ? (
        <SpecialsScreen onNavigateToMenu={() => setCurrentScreen('menu')} />
      ) : currentScreen === 'menu' ? (
        <MenuScreen
          onNavigateToSpecials={() => setCurrentScreen('specials')}
          onNavigateToDrinks={() => setCurrentScreen('drinks')}
        />
      ) : (
        <DrinksScreen
          onNavigateToSpecials={() => setCurrentScreen('specials')}
          onNavigateToFood={() => setCurrentScreen('menu')}
        />
      )}
    </>
  );
}

export default App;
