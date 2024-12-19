import vietVoc from './cards/vietnamesecards.json';
import spanishVoc from './cards/spanishcards.json';

export interface Card {
    id: number;
    front: string;
    back: string;
    deck: string;
    categories: string[];
}

// export const LanguageMap: { [key: string]: Card[] } = {
//     Vietnamese: vietVoc,
//     Spanish: spanishVoc,
// };