import React, { useState } from 'react';

import {MantineProvider, Button, MultiSelect} from '@mantine/core';
import '@mantine/core/styles.css';

import './App.css';

import vietVoc from './cards.json'

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
  const [ShowFront, setShowFront] = useState<boolean>(true);
  const [FrontIsA, setFrontIsA] = useState<boolean>(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleNextCard = () => {
    setShowFront(true);
    console.log(props.cards.length);
    const filteredCards = selectedCategories.length === 0 
        ? props.cards 
        : props.cards.filter(card => 
            card.categories.some(category => selectedCategories.includes(category))
        );

    console.log(filteredCards.length);

    setCurrentCard(getRandomCard(filteredCards));
  }

  const handleFlipDeck = () => {
    setFrontIsA(!FrontIsA);
  }

  const handleFlipCard = () => {
    setShowFront(!ShowFront);
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
        <div className="card-container"
          onClick={handleFlipCard}
        >
          {((FrontIsA && ShowFront) || (!FrontIsA && !ShowFront)) &&(
            currentCard.Aside
          )}
          {((FrontIsA && !ShowFront) || (!FrontIsA && ShowFront)) &&(
            currentCard.Bside
          )}
        </div>
        <Button onClick={handleNextCard}>Next Card</Button>
        <br/>
        <Button onClick={handleFlipDeck}>Flip Deck</Button>
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
