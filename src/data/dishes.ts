export interface Dish {
  name: string;
  image: string;
  price: number;
  time: string;
  description?: string;
  isVeg?: boolean;
  badge?: string;
}

// Mock dishes (food items). Kept standalone for easy future API integration.
export const dishes: Dish[] = [
  {
    name: 'Galouti kebab',
    image:
      'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '20 mins',
    description: 'Melt-in-the-mouth kebab with aromatic spices.',
    isVeg: false,
    badge: 'Highly recommended',
  },
  {
    name: 'Saffron biryani',
    image:
      'https://images.pexels.com/photos/6260921/pexels-photo-6260921.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '20 mins',
    description: 'Aged basmati cooked with saffron strands and goat.',
    isVeg: false,
    badge: 'Highly recommended',
  },
  {
    name: 'Truffle naan',
    image:
      'https://images.pexels.com/photos/2067400/pexels-photo-2067400.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '20 mins',
    description: 'Burnt garlic naan infused with white truffle oil.',
    isVeg: true,
    badge: "Chef's special",
  },
  {
    name: 'Dal bhukara',
    image:
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '20 mins',
    description: 'Lentils shimmered overnight with charcoal fire.',
    isVeg: true,
    badge: 'Highly recommended',
  },
  {
    name: 'Achaari gobi',
    image:
      'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '20 mins',
    description: 'Crispy cauliflower tossed in tangy pickle spices.',
    isVeg: true,
    badge: "Chef's special",
  },
  {
    name: 'Aloo tikki chaat',
    image:
      'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 250,
    time: '20 mins',
    description: 'Crispy potato patties topped with chutneys and spices.',
    isVeg: true,
    badge: 'Signature',
  },
];


