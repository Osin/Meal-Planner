const enum Tag {
  entry = 'Entrée',
  main = 'Repas',
  dessert = 'Dessert',
  drink = 'Boisson',
  snack = 'Gouter',
  other = 'Autre'
}
export interface Meal {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  image: string;
  comments: Comment[];
  tags: Tag[];
}