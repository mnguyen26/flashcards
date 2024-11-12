import { useState } from 'react';

import {MantineProvider, Button, MultiSelect, Tooltip} from '@mantine/core';
import '@mantine/core/styles.css';

import { IconArrowBadgeRight } from '@tabler/icons-react';

import { Card } from './FlashCardsModel';
import './App.css';

interface FlashCardsProps {
  cards: Card[];
}

interface CategoriesDropdownProps {
  cards: Card[];
  handleSelectedCategories: (categories: string[]) => void;
}

const getRandomCard = (cards: Card[]):Card => {
  let randIndex = Math.floor(Math.random() * cards.length);
  let randCard = cards[randIndex];

  return randCard;
}

const CategoriesDropdown = (props: CategoriesDropdownProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = Array.from(new Set(props.cards.flatMap(card => card.categories)));

  const handleCategoriesSelected = (categories: string[]) => {
    setSelectedCategories(categories);
    props.handleSelectedCategories(categories);
  }

  return (
    <>
    <div style={{width: '15em'}}>
      <MultiSelect
        label="Categories"
        placeholder="Filter Cards By a Category"
        data={categories}
        value={selectedCategories}
        onChange={handleCategoriesSelected}
      />
    </div>
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
      <MantineProvider>

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
          <Tooltip 
            label="Next card" 
            position="bottom" 
            offset={5}
          >
            <Button 
              onClick={handleNextCard}
              variant="transparent"
              color="gray">
              <IconArrowBadgeRight />
            </Button>
          </Tooltip>
          </div>
        </div>
        <br/>
        <Tooltip 
          label="Determines which language is shown on the front of the card first" 
          position="bottom" 
          offset={5}>
          <Button 
            onClick={handleFlipDeck}
            variant="outline"
            color="gray"
          >
            Flip Deck
          </Button>
        </Tooltip>
      </div>
      </MantineProvider>
      </>
  )
}

export default FlashCards;
