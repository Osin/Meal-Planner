export enum Tag {
  entry = 'entry',
  main = 'main',
  dessert = 'dessert',
  drink = 'drink',
  snack = 'snack',
  other = 'other'
}
export interface Meal {
  name: string;
  description: string;
  image: {url: string, alt: string};
  tags: string[];
}