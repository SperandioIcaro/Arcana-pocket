export type Arcano = 'maior' | 'paus' | 'copas' | 'espadas' | 'ouros';

export interface CardSide {
  keywords: string[];
  meaning: string;
}

export interface TarotCard {
  id: string;
  name: string;
  nameEn: string;
  arcano: Arcano;
  number: number;
  image: string | number;
  upright: CardSide;
  reversed: CardSide;
}

export type Topic = 'amor' | 'carreira' | 'decisao' | 'autoconhecimento' | 'dia';

export interface SpreadPosition {
  title: string;
  meaning: string;
  x: number; // 0-100 (%)
  y: number; // 0-100 (%)
  rotated?: boolean;
}

export interface Spread {
  id: string;
  name: string;
  count: number;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  topics: Topic[];
  description: string;
  whenToUse: string;
  diagramHeight: number;
  positions: SpreadPosition[];
}

export type RootStackParamList = {
  Tabs: undefined;
  CardDetail: { cardId: string };
  SpreadDetail: { spreadId: string };
};
