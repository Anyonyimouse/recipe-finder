const { dishImages } = require('../images.data');

const asianDishes = [
  {
    name: 'Japanese Tamagoyaki Set',
    cat: 'cat-asian-breakfast',
    prep: 10,
    cook: 10,
    diff: 'Easy',
    img: dishImages.silog,
    ings: ['ing-egg', 'ing-soy-sauce', 'ing-dashi', 'ing-rice', 'ing-cooking-oil'],
    steps: [
      'Whisk 4 Eggs: Whisk 2 eggs (double batch: 4 eggs total) with 3 cups dashi broth, 0.5 cup soy sauce, and 1 tsp sugar.',
      'Roll Omelet Layers: Pour thin egg layer into tamagoyaki pan with 3 tbsp oil, rolling 4 times for 6 minutes.',
      'Slice 4 Rolls: Shape rolled omelet block and cut into 4 thick rectangular portions.',
      'Plate 3 Cups Rice: Spoon 3 cups steamed white rice into 4 breakfast bowls.',
      'Serve 4 Sets: Serve 1 tamagoyaki slice per bowl to yield 4 complete Japanese breakfast sets.'
    ]
  },
  {
    name: 'Japanese Miso & Salmon Breakfast',
    cat: 'cat-asian-breakfast',
    prep: 10,
    cook: 15,
    diff: 'Easy',
    img: dishImages.sinigang,
    ings: ['ing-salmon', 'ing-miso', 'ing-dashi', 'ing-rice', 'ing-nori', 'ing-garlic'],
    steps: [
      'Pan Grill 2 Salmon Fillets: Salt 2 large salmon fillets (cut into 4 portions) and fry in 1 tbsp oil for 8 minutes until flaky.',
      'Simmer Miso Broth: Whisk 2 tbsp miso paste into 3 cups warm dashi broth for 4 minutes.',
      'Portion 3 Cups Rice: Divide 3 cups hot steamed white rice into 4 breakfast bowls.',
      'Ladle Miso Soup: Pour hot miso soup into 4 side bowls garnished with green onions.',
      'Serve 4 Breakfast Sets: Plate salmon, rice, miso soup, and 4 nori sheets to serve 4 Teishoku sets.'
    ]
  },
  {
    name: 'Chicken Teriyaki Bowl',
    cat: 'cat-asian-lunch',
    prep: 15,
    cook: 15,
    diff: 'Easy',
    img: dishImages.inasal,
    ings: ['ing-chicken', 'ing-soy-sauce', 'ing-mirin', 'ing-brown-sugar', 'ing-rice'],
    steps: [
      'Pan Fry 1kg Chicken: Pan fry 1kg chicken thigh cutlets in 3 tbsp oil for 8 minutes until golden.',
      'Simmer Glaze: Pour 0.5 cup soy sauce, 2 tbsp mirin, and 3 tbsp brown sugar; simmer 4 minutes until thick glossy.',
      'Slice 1kg Chicken: Slice the 1kg cooked teriyaki chicken into strips.',
      'Mound 3 Cups Rice: Divide 3 cups steamed white rice into 4 donburi bowls.',
      'Serve 4 Bowls: Top each bowl with sliced chicken and glaze to serve 4 complete lunches.'
    ]
  },
  {
    name: 'Japanese Chicken Katsu Curry',
    cat: 'cat-asian-lunch',
    prep: 20,
    cook: 25,
    diff: 'Medium',
    img: dishImages.kaldereta,
    ings: ['ing-chicken', 'ing-breadcrumbs', 'ing-egg', 'ing-flour', 'ing-curry-block', 'ing-potatoes', 'ing-carrots', 'ing-rice'],
    steps: [
      'Simmer Vegetables & Curry: Simmer 2 potatoes and 2 carrots in 3 cups water for 15 minutes, then melt 1 box curry roux block.',
      'Bread 1kg Chicken: Season 1kg chicken breasts, coat in 1 cup flour, 2 beaten eggs, and 1 cup panko breadcrumbs.',
      'Deep Fry Katsu: Deep fry chicken cutlets in 3 tbsp oil for 8 minutes until golden crisp.',
      'Slice 4 Katsu Cutlets: Slice crispy chicken katsu into strips.',
      'Plate 4 Curry Plates: Divide 3 cups rice across 4 plates, lay katsu, and ladle curry sauce for 4 servings.'
    ]
  },
  {
    name: 'Pork Katsudon',
    cat: 'cat-asian-lunch',
    prep: 15,
    cook: 20,
    diff: 'Medium',
    img: dishImages.silog,
    ings: ['ing-pork-shoulder', 'ing-breadcrumbs', 'ing-egg', 'ing-dashi', 'ing-soy-sauce', 'ing-onion', 'ing-rice'],
    steps: [
      'Fry 800g Pork: Bread 800g pork shoulder with 1 cup panko and 2 eggs; fry in oil for 7 minutes until crisp.',
      'Simmer Dashi Broth: Simmer 2 onions in 3 cups dashi stock and 0.5 cup soy sauce for 4 minutes.',
      'Set 2 Eggs Over Pork: Lay sliced tonkatsu into broth, drizzle 2 beaten eggs, cover 1 minute until soft set.',
      'Mound 3 Cups Rice: Spoon 3 cups hot short-grain rice into 4 donburi bowls.',
      'Slide 4 Portions: Slide sweet egg-tonkatsu mixture evenly over rice bowls to serve 4 portions.'
    ]
  },
  {
    name: 'Japanese Tonkotsu Ramen',
    cat: 'cat-asian-dinner',
    prep: 20,
    cook: 40,
    diff: 'Medium',
    img: dishImages.pancit,
    ings: ['ing-ramen-noodles', 'ing-pork-belly', 'ing-egg', 'ing-garlic', 'ing-soy-sauce', 'ing-nori'],
    steps: [
      'Simmer Tonkotsu Broth: Simmer pork bone broth with 1 head garlic and 0.5 cup soy sauce for 20 minutes.',
      'Boil 2 Packs Ramen: Boil 2 packs ramen noodles in boiling water for 3 minutes until chewy.',
      'Sear 1kg Pork Belly: Sear 1kg sliced pork belly in pan for 4 minutes until charred caramelized.',
      'Divide 4 Nori & Eggs: Soft boil 2 eggs (halved into 4) and prep 4 nori seaweed sheets.',
      'Assemble 4 Bowls: Divide noodles into 4 deep bowls, pour hot broth, top with chashu pork, egg, and nori for 4 servings.'
    ]
  },
  {
    name: 'Beef Gyudon Bowl',
    cat: 'cat-asian-dinner',
    prep: 10,
    cook: 15,
    diff: 'Easy',
    img: dishImages.bulalo,
    ings: ['ing-ground-beef', 'ing-onion', 'ing-dashi', 'ing-soy-sauce', 'ing-mirin', 'ing-rice', 'ing-egg'],
    steps: [
      'Simmer Broth: Combine 3 cups dashi stock, 0.5 cup soy sauce, and 2 tbsp mirin with 2 sliced onions; simmer 5 minutes.',
      'Cook 500g Beef: Add 500g ground/sliced beef into simmering broth, cooking for 5 minutes until tender.',
      'Divide 3 Cups Rice: Spoon 3 cups steamed white rice into 4 deep donburi bowls.',
      'Top Beef & Eggs: Ladle sweet beef and onions over rice, top with 2 eggs (halved/poached).',
      'Serve 4 Gyudon Bowls: Serve 4 piping hot gyudon dinner bowls.'
    ]
  },
  {
    name: 'Shrimp Tempura Bowl (Tendon)',
    cat: 'cat-asian-dinner',
    prep: 15,
    cook: 15,
    diff: 'Medium',
    img: dishImages.sinigang,
    ings: ['ing-shrimp', 'ing-flour', 'ing-egg', 'ing-dashi', 'ing-soy-sauce', 'ing-rice', 'ing-cooking-oil'],
    steps: [
      'Prep 500g Shrimp: Peel and stretch 500g shrimp straight.',
      'Batter & Deep Fry: Dip in 1 cup cold flour-egg batter and fry in 3 tbsp oil for 3 minutes until golden crisp.',
      'Simmer Tendon Sauce: Simmer 3 cups dashi stock and 0.5 cup soy sauce for 3 minutes.',
      'Divide 3 Cups Rice: Scoop 3 cups white rice into 4 bowls.',
      'Serve 4 Tendon Bowls: Arrange crispy tempura over rice and drizzle sauce to serve 4 bowls.'
    ]
  },
  {
    name: 'Okonomiyaki (Japanese Savory Pancake)',
    cat: 'cat-asian-dinner',
    prep: 15,
    cook: 15,
    diff: 'Medium',
    img: dishImages.lumpia,
    ings: ['ing-flour', 'ing-egg', 'ing-dashi', 'ing-pork-belly', 'ing-soy-sauce', 'ing-cooking-oil'],
    steps: [
      'Mix Cabbage Batter: Mix 1 cup flour, 3 cups dashi broth, 2 eggs, and shredded cabbage into batter.',
      'Griddle 4 Pancakes: Pour batter into 4 thick round pancakes on skillet with 3 tbsp oil.',
      'Layer 1kg Pork Belly: Layer 1kg pork belly strips over pancakes, flip and cook 6 minutes per side.',
      'Top Glaze Sauce: Drizzle 0.5 cup soy-okonomiyaki sauce and mayo over tops.',
      'Portion 4 Servings: Serve 1 okonomiyaki pancake per plate to yield 4 dinner servings.'
    ]
  },
  {
    name: 'Mango Sticky Rice',
    cat: 'cat-asian-merienda',
    prep: 15,
    cook: 25,
    diff: 'Easy',
    img: dishImages.pancit,
    ings: ['ing-sticky-rice', 'ing-coconut-milk', 'ing-brown-sugar'],
    steps: [
      'Steam 2 Cups Glutinous Rice: Steam 2 cups sticky rice over water for 20 minutes until cooked.',
      'Simmer Coconut Sauce: Simmer 2 cups coconut milk and 3 tbsp brown sugar for 5 minutes.',
      'Soak Rice: Fold 3/4 coconut sauce into warm sticky rice, resting for 15 minutes.',
      'Slice Ripe Mangoes: Slice fresh ripe mangoes into pieces.',
      'Serve 4 Dessert Plates: Divide rice into 4 plates with mangoes and remaining coconut cream for 4 servings.'
    ]
  }
];

module.exports = { asianDishes };
