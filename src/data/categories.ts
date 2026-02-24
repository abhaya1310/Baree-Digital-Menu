export interface CategoryDefinition {
  name: string;
  image: string;
}

// Food categories displayed in the menu categories modal.
export const foodCategories: CategoryDefinition[] = [
  { name: 'Meals', image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Desserts', image: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Pizza', image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Sushi', image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Burger', image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Dimsum', image: 'https://images.pexels.com/photos/3673757/pexels-photo-3673757.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Pasta', image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Rice Bowl', image: 'https://images.pexels.com/photos/628776/pexels-photo-628776.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Noodles', image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Breakfast', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=300' },
];

// Drink categories displayed in the drink categories modal.
// Figma: Cocktails, Brewed drinks, Wine, Hard liquor, Beer, Shots, Aperitifs
export const drinkCategories: CategoryDefinition[] = [
  { name: 'Cocktails', image: 'https://images.pexels.com/photos/1189257/pexels-photo-1189257.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Brewed drinks', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Wine', image: 'https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Hard liquor', image: 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Beer', image: 'https://images.pexels.com/photos/5537949/pexels-photo-5537949.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Shots', image: 'https://images.pexels.com/photos/4109939/pexels-photo-4109939.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Aperitifs', image: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=300' },
];

// Hookah (Tobacco) categories
export const hookahCategories: CategoryDefinition[] = [
  { name: 'Classic', image: 'https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Mix', image: 'https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Special', image: 'https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=300' },
];
