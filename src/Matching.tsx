import { useState } from 'react';

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

const MatchGame = (props: MatchGameProps) => {
  const [currentCards, setCurrentCards] = useState<Card[]>(getCards(props.cards, 5));

  const getRandIndexes = ():number[] => {
    const indexes: number[] = [1, 2, 3, 4, 5];
    
    for (let i=4 ; i>0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }

    return indexes;
  }

  return (
    <>
    <div> 
      {currentCards.map((card: Card) => {
        return (
          <div className="match-card">
            {card.Aside}
          </div>
        )
      })}
    </div>
    </>
  )
}

export default MatchGame;