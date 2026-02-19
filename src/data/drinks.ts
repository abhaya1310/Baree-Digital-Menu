export interface DrinkItem {
  name: string;
  image: string;
  price: number;
  time: string;
  description: string;
  ingredients: string[];
  addons: { name: string; price: number; image: string }[];
  isVeg: boolean;
}

// Mock drinks. Kept standalone for easy future API integration.
export const drinks: DrinkItem[] = [
  {
    name: 'Pina colada',
    image:
      'https://images.pexels.com/photos/109275/pexels-photo-109275.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '5-10 mins',
    description: 'Rum, coconut cream, and pineapple.',
    ingredients: ['White rum', 'Coconut cream', 'Pineapple juice', 'Ice'],
    addons: [
      {
        name: 'Extra coconut cream',
        price: 5,
        image:
          'https://images.pexels.com/photos/109275/pexels-photo-109275.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
      {
        name: 'Fresh pineapple wedge',
        price: 5,
        image:
          'https://images.pexels.com/photos/1109062/pexels-photo-1109062.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
      {
        name: 'Maraschino cherry',
        price: 5,
        image:
          'https://images.pexels.com/photos/209594/pexels-photo-209594.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
    ],
    isVeg: true,
  },
  {
    name: 'Moscow mule',
    image:
      'https://images.pexels.com/photos/1109062/pexels-photo-1109062.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '5-10 mins',
    description: 'Rum, coconut cream, and pineapple.',
    ingredients: ['Vodka', 'Ginger beer', 'Lime juice', 'Ice'],
    addons: [],
    isVeg: true,
  },
  {
    name: 'Cosmopolitan',
    image:
      'https://images.pexels.com/photos/209594/pexels-photo-209594.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '5-10 mins',
    description: 'Rum, coconut cream, and pineapple.',
    ingredients: ['Vodka', 'Triple sec', 'Cranberry juice', 'Lime juice'],
    addons: [],
    isVeg: true,
  },
  {
    name: 'Margarita',
    image:
      'https://images.pexels.com/photos/605408/pexels-photo-605408.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '5-10 mins',
    description: 'Rum, coconut cream, and pineapple.',
    ingredients: ['Tequila', 'Orange liqueur', 'Lime juice', 'Salt'],
    addons: [],
    isVeg: true,
  },
  {
    name: 'Martini',
    image:
      'https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '5-10 mins',
    description: 'Rum, coconut cream, and pineapple.',
    ingredients: ['Gin', 'Vermouth', 'Olive'],
    addons: [],
    isVeg: true,
  },
  {
    name: 'Blue lagoon',
    image:
      'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '5-10 mins',
    description: 'Rum, coconut cream, and pineapple.',
    ingredients: ['Vodka', 'Blue curacao', 'Lemonade'],
    addons: [],
    isVeg: true,
  },
];


