import vietVoc from './cards/vietnamesecards.json';
import spanishVoc from './cards/spanishcards.json';

export interface Card {
    id: number;
    Aside: string;
    Bside: string;
    categories: string[];
}

export const LanguageMap: { [key: string]: Card[] } = {
    Vietnamese: vietVoc,
    Spanish: spanishVoc,
};