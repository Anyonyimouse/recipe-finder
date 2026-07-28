const categories = [
  { id: 'cat-filipino-breakfast', name: 'Filipino Food - Breakfast (Almusal)', icon: 'egg' },
  { id: 'cat-filipino-lunch', name: 'Filipino Food - Lunch (Tanghalian)', icon: 'utensils' },
  { id: 'cat-filipino-dinner', name: 'Filipino Food - Dinner (Hapunan)', icon: 'flame' },
  { id: 'cat-filipino-merienda', name: 'Filipino Food - Merienda & Snacks', icon: 'cake' },

  { id: 'cat-italian-breakfast', name: 'Italian Food - Breakfast', icon: 'egg' },
  { id: 'cat-italian-lunch', name: 'Italian Food - Lunch', icon: 'utensils' },
  { id: 'cat-italian-dinner', name: 'Italian Food - Dinner', icon: 'flame' },
  { id: 'cat-italian-merienda', name: 'Italian Food - Dessert', icon: 'cake' },

  { id: 'cat-american-breakfast', name: 'American Food - Breakfast', icon: 'egg' },
  { id: 'cat-american-lunch', name: 'American Food - Lunch', icon: 'utensils' },
  { id: 'cat-american-dinner', name: 'American Food - Dinner', icon: 'flame' },
  { id: 'cat-american-merienda', name: 'American Food - Dessert', icon: 'cake' },

  { id: 'cat-asian-breakfast', name: 'Japanese Food - Breakfast', icon: 'egg' },
  { id: 'cat-asian-lunch', name: 'Japanese Food - Lunch', icon: 'utensils' },
  { id: 'cat-asian-dinner', name: 'Japanese Food - Dinner', icon: 'flame' },
  { id: 'cat-asian-merienda', name: 'Japanese Food - Dessert & Snacks', icon: 'cake' }
];

const cuisineMap = {
  'cat-filipino-breakfast': 'Filipino Food',
  'cat-filipino-lunch': 'Filipino Food',
  'cat-filipino-dinner': 'Filipino Food',
  'cat-filipino-merienda': 'Filipino Food',
  'cat-italian-breakfast': 'Italian Food',
  'cat-italian-lunch': 'Italian Food',
  'cat-italian-dinner': 'Italian Food',
  'cat-italian-merienda': 'Italian Food',
  'cat-american-breakfast': 'American Food',
  'cat-american-lunch': 'American Food',
  'cat-american-dinner': 'American Food',
  'cat-american-merienda': 'American Food',
  'cat-asian-breakfast': 'Japanese Food',
  'cat-asian-lunch': 'Japanese Food',
  'cat-asian-dinner': 'Japanese Food',
  'cat-asian-merienda': 'Japanese Food'
};

const mealTypeMap = {
  'cat-filipino-breakfast': 'Breakfast',
  'cat-filipino-lunch': 'Lunch',
  'cat-filipino-dinner': 'Dinner',
  'cat-filipino-merienda': 'Merienda',
  'cat-italian-breakfast': 'Breakfast',
  'cat-italian-lunch': 'Lunch',
  'cat-italian-dinner': 'Dinner',
  'cat-italian-merienda': 'Merienda',
  'cat-american-breakfast': 'Breakfast',
  'cat-american-lunch': 'Lunch',
  'cat-american-dinner': 'Dinner',
  'cat-american-merienda': 'Merienda',
  'cat-asian-breakfast': 'Breakfast',
  'cat-asian-lunch': 'Lunch',
  'cat-asian-dinner': 'Dinner',
  'cat-asian-merienda': 'Merienda'
};

module.exports = {
  categories,
  cuisineMap,
  mealTypeMap
};
