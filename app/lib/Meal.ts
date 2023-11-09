const enum Tag {
  entry = 'Entrée',
  main = 'Repas',
  dessert = 'Dessert',
  drink = 'Boisson',
  snack = 'Gouter',
  other = 'Autre'
}
export interface Meal {
  name: string;
  description: string;
  ingredients: string[];
  image: string;
  comments: string[];
  tags: Tag[];
}