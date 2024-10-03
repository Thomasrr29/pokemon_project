export interface cardEvolutionMajor {
    id: string,
    name: string,
    number: number,
    types: string[],
    supertype: string,
    images: any,

}

interface CardData {
    id: string;
    name: string;
    number: string;
    supertype: string;
    types: string[];
    images: {
      small: string;
      large: string;
    };
  }

export interface CardsEvolution {
    [evolutionName: string]: CardData[];
  }