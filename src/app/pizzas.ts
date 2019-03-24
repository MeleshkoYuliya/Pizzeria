export class Pizzas {
  pizzas: Array<Pizza>;
}

export class Pizza {
  image: string;
  name: string;
  ingredients: Array<Ingredient>;
  sizes: Array<number>;
}

class Ingredient {
  ingredient: string;
}
