import { useState } from 'react';

import {MantineProvider, Button, MultiSelect} from '@mantine/core';
import '@mantine/core/styles.css';

import { IconArrowBadgeRight } from '@tabler/icons-react';

import vietVoc from './cards.json'

import './App.css';

interface Card {
  Aside: string;
  Bside: string;
  categories: string[];
}

interface FlashCardsProps {
  cards: Card[];
}

interface CategoriesDropdown {
  cards: Card[];
  handleSelectedCategories: (categories: string[]) => void;
}

const getRandomCard = (cards: Card[]):Card => {
  let randIndex = Math.floor(Math.random() * cards.length);
  let randCard = cards[randIndex];

  return randCard;
}

const CategoriesDropdown = (props: CategoriesDropdown) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = Array.from(new Set(props.cards.flatMap(card => card.categories)));

  const handleCategoriesSelected = (categories: string[]) => {
    setSelectedCategories(categories);
    props.handleSelectedCategories(categories);
  }

  return (
    <>
      <MultiSelect
        label="Categories"
        placeholder="Filter Cards By a Category"
        data={categories}
        value={selectedCategories}
        onChange={handleCategoriesSelected}
      />
    </>
  )
}

const FlashCards = (props: FlashCardsProps) => {
  const [currentCard, setCurrentCard] = useState<Card>(getRandomCard(props.cards))
  const [showFront, setShowFront] = useState<boolean>(true);
  const [frontIsA, setFrontIsA] = useState<boolean>(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleNextCard = () => {
    const filteredCards = selectedCategories.length === 0 
    ? props.cards 
    : props.cards.filter(card => 
      card.categories.some(category => selectedCategories.includes(category))
    );
    
    setShowFront(true);
    setCurrentCard(getRandomCard(filteredCards));
  }

  const handleFlipDeck = () => {
    setFrontIsA(!frontIsA);
  }

  const handleFlipCard = () => {
    setShowFront(!showFront);
  }

  const handleSelectCategories = (categories: string[]) => {
    setSelectedCategories(categories);
  }

  return (
      <>
      <div className="cards-wrapper">
        <CategoriesDropdown 
          cards={props.cards}
          handleSelectedCategories={handleSelectCategories}
        />

        <div className="card-hor-container">
          <div className="button-container" />
          <div className="card-vert-container" key={currentCard.Aside}>
            <div className={`card ${!showFront ? 'flipped' : ''}`}
              onClick={handleFlipCard}
              >
              <div className="card card-front">
                {frontIsA && (currentCard.Aside)}
                {!frontIsA && (currentCard.Bside)}
              </div>
              <div className="card card-back">
                {frontIsA && (currentCard.Bside)}
                {!frontIsA && (currentCard.Aside)}
              </div>
            </div>
          </div>
          <div className="button-container">
            <Button 
              onClick={handleNextCard}
              variant="transparent"
              color="gray">
              <IconArrowBadgeRight />
            </Button>
          </div>
        </div>
        <Button 
          onClick={handleFlipDeck}
          variant="outline"
          color="gray"
        >
            Flip Deck
          </Button>
      </div>
      </>
  )
}

function App() {


  return (
    <>
    <MantineProvider>
      <FlashCards cards={vietVoc} />
    </MantineProvider>
    </>
  );
}

export default App;
