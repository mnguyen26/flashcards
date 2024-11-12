import { useState } from 'react';

import { useDisclosure } from '@mantine/hooks';
import {MantineProvider, Drawer} from '@mantine/core';

import { MenuButton, Menu} from './Menu';
import FlashCards from './Flashcards';
import MatchGame from './Matching';

import vietVoc from './cards.json'

export interface Card {
  Aside: string;
  Bside: string;
  categories: string[];
}

function App() {
  const [showFlashCards, setShowFlashCards] = useState<boolean>(true);
  const [showMatchGame, setShowMatchGame] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);

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

  return (
    <>
    <MantineProvider>
      
      <Drawer opened={opened} onClose={close} >
        <Menu onFlashCardClick={handleFlashCardClick} onMatchingClick={handleMatchingClick}/>
      </Drawer>
      <MenuButton onClick={open} />
      {showFlashCards && (<FlashCards cards={vietVoc} />)}
      {showMatchGame && (<MatchGame cards={vietVoc} />)}
    </MantineProvider>
    </>
  );
}

export default App;
