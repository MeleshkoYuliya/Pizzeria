import { Pizza } from '../models/pizza.model';

export const PIZZAS: Pizza[] = [
  {
    id: 1,
    image: 'assets/images/4seasons.jpg',
    name: 'Four seasons',
    ingredients: [{
      ingredient: 'tomato sauce'
    },
    {
      ingredient: 'mozzarrel cheese'
    },
    {
      ingredient: 'ham'
    },
    {
      ingredient: 'champignons'
    },
    {
      ingredient: 'shrimps'
    },

    {
      ingredient: 'mussels'
    },
    {
      ingredient: 'garlic butter'
    }
    ],
    info: [{
      size: 23,
      price: 7.3
    },
    {
      size: 30,
      price: 8.8
    },
    {
      size: 35,
      price: 13.3
    },
    {
      size: 40,
      price: 21
    }
    ],
    nutricion: {
      protein: 9.4,
      fats: 6.5,
      carbohydrates: 28.2,
      energy: '208.8 kcal'
    }
  },
  {
    id: 2,
    image: 'assets/images/appetito.jpg',
    name: 'Appetizing',
    ingredients: [{
      ingredient: 'tomato sauce'
    },
    {
      ingredient: 'mozzarrel cheese'
    },
    {
      ingredient: 'bacon'
    },
    {
      ingredient: 'chicken fillet'
    },
    {
      ingredient: 'barbecue sauce'
    },

    {
      ingredient: 'cherry tomatoes'
    },
    {
      ingredient: 'garlic butter'
    }
    ],
    info: [{
      size: 30,
      price: 8.6
    },
    {
      size: 35,
      price: 11.7
    },
    {
      size: 40,
      price: 23.2
    }
    ],
    nutricion: {
      protein: 9.9,
      fats: 9.3,
      carbohydrates: 25.2,
      energy: '224.8 kcal'
    }
  },
  {
    id: 3,
    image: 'assets/images/byanka.jpg',
    name: 'Bianca',
    ingredients: [{
      ingredient: 'olive oil'
    },
    {
      ingredient: 'mozzarrel cheese'
    },
    {
      ingredient: 'canned pears'
    },
    {
      ingredient: 'soft blue cheese'
    },
    {
      ingredient: 'walnut'
    }
    ],
    info: [{
      size: 23,
      price: 8.6
    },
    {
      size: 30,
      price: 10.9
    }
    ],
    nutricion: {
      protein: 9.4,
      fats: 9.2,
      carbohydrates: 25.2,
      energy: '223.8 kcal'
    }
  },
  {
    id: 4,
    image: 'assets/images/Hawaiian.jpg',
    name: 'Hawaiian',
    ingredients: [{
      ingredient: 'mozzarrel cheese'
    },
    {
      ingredient: 'ham'
    },
    {
      ingredient: 'canned pineapple'
    },
    {
      ingredient: 'tomato sauce'
    }
    ],
    info: [{
      size: 23,
      price: 5.5
    },
    {
      size: 40,
      price: 18.9
    }
    ],
    nutricion: {
      protein: 10.1,
      fats: 6.6,
      carbohydrates: 26.2,
      energy: '204.8 kcal'
    }
  },
  {
    id: 5,
    image: 'assets/images/hunting.jpg',
    name: 'Hunting',
    ingredients: [{
      ingredient: 'mozzarrel cheese'
    },
    {
      ingredient: 'onion'
    },
    {
      ingredient: 'tomato sauce'
    },
    {
      ingredient: 'champignons'
    },
    {
      ingredient: 'bacon'
    },
    {
      ingredient: 'beef'
    },
    {
      ingredient: 'taco seasoning'
    },
    {
      ingredient: 'Hunting sauce'
    },
    {
      ingredient: 'chili'
    },
    {
      ingredient: 'garlic oil'
    }
    ],
    info: [{
      size: 23,
      price: 7.8
    },
    {
      size: 30,
      price: 11
    },
    {
      size: 35,
      price: 15.4
    },
    {
      size: 40,
      price: 29
    }
    ],
    nutricion: {
      protein: 10.4,
      fats: 7.5,
      carbohydrates: 28,
      energy: '222.8 kcal'
    }
  },
  {
    id: 6,
    image: 'assets/images/peperoni.jpg',
    name: 'Pepperoni',
    ingredients: [{
      ingredient: 'mozzarrel cheese'
    },
    {
      ingredient: 'tomato sauce'
    },
    {
      ingredient: 'pepperoni'
    },
    {
      ingredient: 'ham'
    },
    {
      ingredient: 'onion'
    },
    {
      ingredient: ' pepperoni pepper'
    }
    ],
    info: [{
      size: 23,
      price: 6.8
    },
    {
      size: 30,
      price: 12.8
    },
    {
      size: 35,
      price: 23.4
    }
    ],
    nutricion: {
      protein: 9.7,
      fats: 9.4,
      carbohydrates: 28.6,
      energy: '238.6 kcal'
    }
  },
  {
    id: 7,
    image: 'assets/images/roman.jpg',
    name: 'Roman',
    ingredients: [{
      ingredient: 'mozzarrel cheese'
    },
    {
      ingredient: 'tomato sauce'
    },
    {
      ingredient: 'chicken fillet'
    },
    {
      ingredient: 'cheese sauce'
    },
    {
      ingredient: 'pickled cucumbers'
    },
    {
      ingredient: 'garlic butter'
    }
    ],
    info: [{
      size: 23,
      price: 6.4
    },
    {
      size: 30,
      price: 11.9
    },
    {
      size: 35,
      price: 22.6
    }
    ],
    nutricion: {
      protein: 11.5,
      fats: 12.3,
      carbohydrates: 24.8,
      energy: '256.5 kcal'
    }
  },
  {
    id: 8,
    image: 'assets/images/romeo.jpg',
    name: 'Romeo',
    ingredients: [{
      ingredient: 'mozzarrel cheese'
    },
    {
      ingredient: 'tomato sauce'
    },
    {
      ingredient: 'ham'
    },
    {
      ingredient: 'pork'
    },
    {
      ingredient: 'ranch sauce'
    }
    ],
    info: [{
      size: 23,
      price: 6.9
    },
    {
      size: 30,
      price: 8.9
    },
    {
      size: 35,
      price: 12.6
    },
    {
      size: 40,
      price: 22.9
    }
    ],
    nutricion: {
      protein: 10.4,
      fats: 7.5,
      carbohydrates: 28.0,
      energy: '222.8 kcal'
    }
  },
  {
    id: 9,
    image: 'assets/images/Student.jpg',
    name: 'Student',
    ingredients: [{
      ingredient: 'mozzarrel cheese'
    },
    {
      ingredient: 'tomato sauce'
    },
    {
      ingredient: 'ham'
    },
    {
      ingredient: ' sausages'
    }
    ],
    info: [{
      size: 23,
      price: 5.3
    },
    {
      size: 30,
      price: 7.2
    },
    {
      size: 35,
      price: 9.9
    },
    {
      size: 40,
      price: 16.3
    }
    ],
    nutricion: {
      protein: 10.4,
      fats: 11.4,
      carbohydrates: 25.0,
      energy: '244.3 kcal'
    }
  },
  {
    id: 10,
    image: 'assets/images/venice.jpg',
    name: 'Venice',
    ingredients: [{
      ingredient: 'mozzarrel cheese'
    },
    {
      ingredient: 'tomato sauce'
    },
    {
      ingredient: 'ham'
    },
    {
      ingredient: 'shrimp'
    },
    {
      ingredient: 'lemon'
    }
    ],
    info: [{
      size: 23,
      price: 7.3
    },
    {
      size: 30,
      price: 8.2
    },
    {
      size: 35,
      price: 22.9
    }
    ],
    nutricion: {
      protein: 10.3,
      fats: 12.7,
      carbohydrates: 24.7,
      energy: '255.7 kcal'
    }
  }
];
