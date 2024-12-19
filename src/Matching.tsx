import { useState, useEffect } from 'react';

import { Card } from './FlashCardsModel';
import { CategoriesDropdown } from './SharedComponents';
import './App.css';

interface MatchGameProps {
    cards: Card[];
}

const NumCards = 5;

const MatchGame = (props: MatchGameProps) => {
  const [leftCards, setLeftCards] = useState<Card[]>([]);
  const [rightCards, setRightCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<{left:number | null, right:number | null}>({ left: null, right: null });
  const [matches, setMatches] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const getFilteredCards = (categories: string[]): Card[] => {
    const filteredCards = categories.length === 0
      ? props.cards
      : props.cards.filter(card =>
          card.categories.some(category => categories.includes(category))
      );
  
    return filteredCards;
  }

  const getRandCards = (): Card[] => {
    const filteredDeck = getFilteredCards(categories);
    const shuffledDeck = [...filteredDeck].sort(() => Math.random() - 0.5);
    const drawnCards = shuffledDeck.slice(0, 5);

    return drawnCards;
  }

  useEffect(() => {
    const selectedCards = getRandCards();
    setLeftCards(selectedCards);
    setRightCards([...selectedCards].sort(() => Math.random() - 0.5));
  }, [props.cards, categories]);

  useEffect(() => {
    if (selected.left && selected.right) {
      if (selected.left === selected.right) {
        setMatches((prev) => [...prev, selected.left as number]);
      }
      setSelected({left: null, right: null});
      
      if (matches.length + 1 === NumCards) { 
        const newCards = getRandCards();
        setLeftCards(newCards);
        setRightCards([...newCards].sort(() => Math.random() - 0.5));
        setMatches([]); 
      }
    }
  }, [selected, matches]) 

  const handleSelect = (id:number, side:string) => {
    setSelected((prev) => ({ ...prev, [side]: id }));
  };

  const handleSelectCategories = (categories: string[]) => {
    setCategories(categories);
  }

  return (
    <>
    <div className="matching-wrapper">
      <CategoriesDropdown cards={props.cards} handleSelectedCategories={handleSelectCategories} />
      <div className="matching-container">
        <div className="matching-col" key="left">
          {leftCards.map((card: Card) => {
            
            const isMatched = matches.includes(card.id);
            return (
              <div 
                key={card.id+"A"}
                className={`match-card ${selected.left === card.id ? 'selected' : matches.includes(card.id) ? 'matched' : ''}`}
                onClick={() => handleSelect(card.id, "left")}>
                {card.front}
              </div>
            )
          })}
        </div>
        <div className="matching-col" key="right">
        {rightCards.map((card: Card) => {
            return (
              <div
                key={card.id+"B"}
                className={`match-card ${selected.right === card.id ? 'selected' : matches.includes(card.id) ? 'matched' : ''}`}
                onClick={() => handleSelect(card.id, "right")}>
                {card.back}
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