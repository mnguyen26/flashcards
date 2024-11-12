import { useState } from 'react';

import { MultiSelect } from '@mantine/core';

import { Card } from './FlashCardsModel';

interface CategoriesDropdownProps {
    cards: Card[];
    handleSelectedCategories: (categories: string[]) => void;
}

export const CategoriesDropdown = (props: CategoriesDropdownProps) => {
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
            label="Filter Cards"
            placeholder="Select one or more categories"
            data={categories}
            value={selectedCategories}
            onChange={handleCategoriesSelected}
        />
        </div>
        </>
    )
}