
export class Pizza {
  _id: string | number;
  imagePath: string;
  name: string;
  ingredients: Array<string>;
  info: Array<Info>;
  nutricion: Nutricion;
  price?: number;
  removedIngredients?: Array<string>;
  addedIngredients?: Array<string>;
  qualities?: any;
  amount?: number
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
 