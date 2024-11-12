import { useState, useEffect } from 'react';

import {MantineProvider, Button, Tooltip} from '@mantine/core';
import '@mantine/core/styles.css';

import { IconArrowBadgeRight } from '@tabler/icons-react';

import { Card } from './FlashCardsModel';
import { CategoriesDropdown } from './SharedComponents';
import './App.css';

interface FlashCardsProps {
  cards: Card[];
}

const getRandomCard = (cards: Card[]):Card => {
  let randIndex = Math.floor(Math.random() * cards.length);
  let randCard = cards[randIndex];

  return randCard;
}

const FlashCards = (props: FlashCardsProps) => {
  const [currentCard, setCurrentCard] = useState<Card>(getRandomCard(props.cards))
  const [showFront, setShowFront] = useState<boolean>(true);
  const [frontIsA, setFrontIsA] = useState<boolean>(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    setCurrentCard(getRandomCard(props.cards));
    setShowFront(true);
    setFrontIsA(true);
  },[props.cards]); //MMN make a defaults function

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
