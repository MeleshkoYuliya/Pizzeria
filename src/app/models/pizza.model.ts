
export class Pizza {
  id: string | number;
  image: string;
  name: string;
  ingredients: Array<Ingredient>;
  info: Array<Info>;
  nutricion: Nutricion;
  price?: number;
  removedIngredients?: Array<Ingredient>;
  addedIngredients?: Array<Ingredient>;
  qualities?: any;
  amount?: number;
}

export class Ingredient {
  ingredient: string;
}
class Info {
  price: number;
  size: number;
}
class Nutricion {
  protein: number;
  fats: number;
  carbohydrates: number;
  energy: string;
}
