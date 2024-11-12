import { useState } from 'react';

import { useDisclosure } from '@mantine/hooks';
import {MantineProvider, Drawer} from '@mantine/core';

import { MenuButton, Menu} from './Menu';
import FlashCards from './Flashcards';
import MatchGame from './Matching';

import { Card, LanguageMap } from './FlashCardsModel';

function App() {
  const [showFlashCards, setShowFlashCards] = useState<boolean>(true);
  const [showMatchGame, setShowMatchGame] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [language, setLanguage] = useState<string>("Vietnamese");
  const [cards, setCards] = useState<Card[]>(LanguageMap["Vietnamese"]);

  const handleFlashCardClick = () => {
    setShowFlashCards(true);
    setShowMatchGame(false);

    close();
  }

  const handleMatchingClick = () => {
    setShowFlashCards(false);
    setShowMatchGame(true);

    close();
  }

  const handleLanguageChange = (language: string | null) => {
    if (language) {
      setLanguage(language);
      setCards(LanguageMap[language]);
    }
  }

  return (
    <>
    <MantineProvider>
      
      <Drawer opened={opened} onClose={close} >
        <Menu onFlashCardClick={handleFlashCardClick} onMatchingClick={handleMatchingClick} onLanguageSelect={handleLanguageChange} currentLanguage={language}/>
      </Drawer>
      <MenuButton onClick={open} />
      {showFlashCards && (<FlashCards cards={cards} />)}
      {showMatchGame && (<MatchGame cards={cards} />)}
    </MantineProvider>
    </>
  );
}

export default App;
