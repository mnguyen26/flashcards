import { useState, useEffect } from 'react';

import { Card } from './FlashCardsModel';
import './App.css';

interface MatchGameProps {
    cards: Card[];
}

const NumCards = 5;

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
  const indexes: number[] = Array.from({ length: NumCards }, (_, i) => i);
  
  for (let i=NumCards-1 ; i>0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  
  return indexes;
}

const MatchGame = (props: MatchGameProps) => {
  const [cardsLeft, setCardsleft] = useState<Card[]>(getCards(props.cards, NumCards));
  const [cardsRight, setCardsRight] = useState<Card[]>([]);
  const [selectedCardLeft, setSelectedCardLeft] = useState<Card|null>(null);
  const [selectedCardRight, setSelectedCardRight] = useState<Card|null>(null);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);

  useEffect(() => {
    const cards: Card[] = [];
    const indexes = getRandIndexes();

    for (let i = 0; i < cardsLeft.length; i++) {
      cards.push(cardsLeft[indexes[i]]);
    }

    setCardsRight(cards);
  }, [cardsLeft]);

  useEffect(() => {
    if (selectedCardLeft !== null && selectedCardRight !== null) {
      if (selectedCardLeft.Aside === selectedCardRight.Aside) {
        setMatchedCards(prevMatches => [...prevMatches, selectedCardLeft.Aside]);
      }

      setSelectedCardLeft(null);
      setSelectedCardRight(null);
    }
  }, [selectedCardLeft, selectedCardRight]);

  useEffect(() => {
    if (matchedCards.length === NumCards) {
      setMatchedCards([]);
      setCardsleft(getCards(props.cards, NumCards));
    }

  }, [matchedCards]);

  const handleSetCard = (card: Card, leftCard: boolean) => {
    if (leftCard) {
      setSelectedCardLeft(prevCard => prevCard === card ? null : card);
    } else {
      setSelectedCardRight(prevCard => prevCard === card ? null : card);
    }
  }

  return (
    <>
    <div className="matching-wrapper">
      <div className="matching-container">
        <div className="matching-col" key="left">
          {cardsLeft.map((card: Card) => {
            const isMatched = matchedCards.includes(card.Aside);
            return (
              <div 
                key={card.Aside}
                className={`match-card ${isMatched ? 'matched' : selectedCardLeft === card ? 'selected' : ''}`}
                onClick={() => handleSetCard(card, true)}>
                {card.Aside}
              </div>
            )
          })}
        </div>
        <div className="matching-col" key="right">
        {cardsRight.map((card: Card) => {
            const isMatched = matchedCards.includes(card.Aside);
            return (
              <div
                key={card.Bside}
                className={`match-card ${isMatched ? 'matched' : selectedCardRight === card ? 'selected' : ''}`}
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