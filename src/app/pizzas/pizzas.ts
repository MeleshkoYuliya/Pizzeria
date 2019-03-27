export class Pizzas {
  pizzas: Array<Pizza>;
}

export class Pizza {
  id?: number;
  image: string;
  name: string;
  ingredients: Array<Ingredient>;
  info: Array<Info>;
}

class Ingredient {
  ingredient: string;
}
class Info {
  price: number;
  size: number;
}
