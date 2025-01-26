import { useState, useEffect } from 'react';

import { useDisclosure } from '@mantine/hooks';
import {MantineProvider, Drawer} from '@mantine/core';

import { MenuButton, Menu} from './Menu';
import FlashCards from './Pages/Flashcards';
import MatchGame from './Pages/Matching';
import List from './Pages/List';

import { Card } from './Models/FlashCardsModel';
import { getCardsByDeck } from './Services/CardService';

import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './css/Layout.css';

function App() {
  const [showFlashCards, setShowFlashCards] = useState<boolean>(true);
  const [showMatchGame, setShowMatchGame] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(false);
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
    setShowMatchGame(false);
    setShowList(false);
    setShowFlashCards(true);

    close();
  }

  const handleMatchingClick = () => {
    setShowFlashCards(false);
    setShowList(false);
    setShowMatchGame(true);

    close();
  }

  const handleListClick = () => {
    setShowFlashCards(false);
    setShowMatchGame(false);
    setShowList(true);

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
        <Menu 
          onFlashCardClick={handleFlashCardClick} 
          onMatchingClick={handleMatchingClick} 
          onListClick={handleListClick}
          onLanguageSelect={handleLanguageChange} 
          currentLanguage={language}/>
      </Drawer>
      <MenuButton onClick={open} />
      {showFlashCards && (<FlashCards cards={cards} />)}
      {showMatchGame && (<MatchGame cards={cards} />)}
      {showList && (<List cards={cards} />)}
    </MantineProvider>
    </>
  );
}

export default App;
