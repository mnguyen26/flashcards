import { useState, useEffect } from 'react';

import {MantineProvider, Button, Tooltip} from '@mantine/core';
import '@mantine/core/styles.css';

import { IconArrowBadgeRight } from '@tabler/icons-react';

import { Card } from '../Models/FlashCardsModel';
import { CategoriesDropdown } from '../SharedComponents';
import '../css/App.css';

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

  const filterCards = (cards: Card[]): Card[] => {
    return selectedCategories.length === 0 
      ? cards 
      : cards.filter(card => 
          card.categories.some(category => selectedCategories.includes(category))
        );
  }

  useEffect(() => {
    const filteredCards = filterCards(props.cards);
    setCurrentCard(getRandomCard(filteredCards));
    setShowFront(true);
    setFrontIsA(true);
  }, [props.cards, selectedCategories]);

  const handleNextCard = () => {
    const filteredCards = filterCards(props.cards);
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
          <div className="card-vert-container" key={currentCard.front}>
            <div className={`card ${!showFront ? 'flipped' : ''}`}
              onClick={handleFlipCard}
              >
              <div className="card card-front">
                {frontIsA && (currentCard.front)}
                {!frontIsA && (currentCard.back)}
              </div>
              <div className="card card-back">
                {frontIsA && (currentCard.back)}
                {!frontIsA && (currentCard.front)}
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
