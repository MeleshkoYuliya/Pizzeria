
export class Pizza {
  id: string | number;
  image: string;
  name: string;
  ingredients: Array<Ingredient>;
  info: Array<Info>;
  nutricion: Nutricion;
}

class Ingredient {
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
