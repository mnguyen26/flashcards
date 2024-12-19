import { useState, useEffect } from 'react';

import { useDisclosure } from '@mantine/hooks';
import {MantineProvider, Drawer} from '@mantine/core';

import { MenuButton, Menu} from './Menu';
import FlashCards from './Flashcards';
import MatchGame from './Matching';

import { Card } from './FlashCardsModel';
import { getCardsByDeck } from './Services/CardService';

function App() {
  const [showFlashCards, setShowFlashCards] = useState<boolean>(true);
  const [showMatchGame, setShowMatchGame] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [language, setLanguage] = useState<string>("Vietnamese");
  const [cards, setCards] = useState<Card[]>([{ id: 1, front: '', back: '', deck: '', categories: [] }]);

  const getAPICardsByDeck = async (deck: string) => {
    try {
      const data = await getCardsByDeck(deck);
      setCards(data);
    } catch (err) {
      // setError(err.message);
    }
  };

  useEffect(() => {
    getAPICardsByDeck(language);
  }, [language]);

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
