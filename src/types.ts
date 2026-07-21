
export interface User {
  name: string;
  email: string;
  age: number;
  race: string;
  height: number;
  starSign: string;
  isAdult: boolean;
}

export interface Animal {
  name: string;
  dateOfBirth: Date;
  species: string;
  age: number;
  numberOfLegs: number;
}

export interface Drink {
  name: string;
  isFizzy: boolean;
  isAlcoholic: boolean;
  dateOfExpiration: Date;
  price: number;
}

export type Entity = User | Animal | Drink
export type EntityType = 'user' | 'animal'| 'drink'
