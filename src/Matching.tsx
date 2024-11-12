import { useState, useEffect } from 'react';

import { Card } from './App';
import './App.css';

interface MatchGameProps {
    cards: Card[];
}

const getRandomCard = (cards: Card[]):Card => {
  let randIndex = Math.floor(Math.random() * cards.length);
  let randCard = cards[randIndex];

  return randCard;
}

const getCards = (deck: Card[], numCards: number):Card[] => {
  const cardsSet = new Set<string>();
  const cards: Card[] = [];

  for (var i=0; i<numCards; i++) {
    let card = getRandomCard(deck);

    while (cardsSet.has(card.Aside)) {
      card = getRandomCard(deck);
    }

    cardsSet.add(card.Aside);
    cards.push(card);
  }

  return cards;
}

// MMN re-write this how you would
const getRandIndexes = ():number[] => {
  const indexes: number[] = [0, 1, 2, 3, 4];
  
  for (let i=4 ; i>0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  
  return indexes;
}

const MatchGame = (props: MatchGameProps) => {
  const [cardsLeft, setCardsleft] = useState<Card[]>(getCards(props.cards, 5));
  const [cardsRight, setCardsRight] = useState<Card[]>([]);
  const [selectedCardLeft, setSelectedCardLeft] = useState<Card|null>(null);
  const [selectedCardRight, setSelectedCardRight] = useState<Card|null>(null);

  useEffect(() => {
    const cards: Card[] = [];
    const indexes = getRandIndexes();

    for (let i=0; i<cardsLeft.length; i++) {
      cards.push(cardsLeft[indexes[i]]);
    }

    setCardsRight(cards);
  },[cardsLeft])

  useEffect(() => {
    if (selectedCardLeft !== null && selectedCardRight !== null) {
      if (selectedCardLeft.Aside === selectedCardRight.Aside) {
        console.log("MATCH!");
      } else {
        console.log("no");
      }
      setSelectedCardLeft(null);
      setSelectedCardRight(null);
    }
  }, [selectedCardLeft, selectedCardRight]);

  const handleSetCard = (card: Card, leftCard: boolean) => {
    if (leftCard) {
      setSelectedCardLeft(card);
    } else {
      setSelectedCardRight(card);
    }
  }

  return (
    <>
    <div className="matching-wrapper">
      <div className="matching-container">
        <div className="matching-col">
          {cardsLeft.map((card: Card) => {
            return (
              <div 
              className="match-card"
              onClick={() => handleSetCard(card, true)}>
                {card.Aside}
              </div>
            )
          })}
        </div>
        <div className="matching-col">
        {cardsRight.map((card: Card) => {
            return (
              <div 
              className="match-card"
              onClick={() => handleSetCard(card, false)}>
                {card.Bside}
              </div>
            )
          })}
        </div>
      </div> 
    </div>
    </>
  )
}

export default MatchGame;