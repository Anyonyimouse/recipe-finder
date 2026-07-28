const { dishImages } = require('../images.data');

const americanDishes = [
  {
    name: 'Classic Pancakes & Bacon',
    cat: 'cat-american-breakfast',
    prep: 10,
    cook: 15,
    diff: 'Easy',
    img: dishImages.silog,
    ings: ['ing-flour', 'ing-egg', 'ing-pork-belly', 'ing-butter', 'ing-brown-sugar'],
    steps: [
      'Mix Dry & Wet Batter: Sift 1 cup flour, 3 tbsp brown sugar, and 1/2 tsp salt in a bowl. Whisk 2 eggs, 1 cup milk, and 50g melted butter, then combine gently into batter.',
      'Griddle Pancakes: Heat griddle over medium heat with 3 tbsp oil. Ladle batter into 8 round pancakes, cooking 3 minutes per side until golden brown.',
      'Fry Crispy Bacon: Fry 1kg pork belly bacon strips in a skillet for 6 minutes until crispy.',
      'Divide 4 Stacks: Stack 2 pancakes and bacon strips onto 4 breakfast plates (4 servings).',
      'Top Butter & Syrup: Top each plate with 50g butter and maple syrup to serve 4 complete breakfasts.'
    ]
  },
  {
    name: 'Classic Cheeseburger',
    cat: 'cat-american-lunch',
    prep: 15,
    cook: 15,
    diff: 'Easy',
    img: dishImages.silog,
    ings: ['ing-ground-beef', 'ing-cheddar', 'ing-onion', 'ing-butter', 'ing-cooking-oil'],
    steps: [
      'Shape 4 Beef Patties: Divide 500g ground beef into 4 equal portions (125g each) and shape into 3/4-inch thick round patties.',
      'Sear Patties: Heat 3 tbsp cooking oil in cast-iron skillet over high heat. Season patties with salt and pepper, searing for 4 minutes per side.',
      'Melt 4 Cheddar Slices: Place 150g sliced cheddar cheese over the 4 patties, cover skillet with lid for 1 minute until cheese melts.',
      'Toast 4 Buns: Melt 50g butter on skillet to toast 4 hamburger brioche buns for 1 minute.',
      'Assemble 4 Burgers: Assemble 1 cheeseburger per plate to yield 4 complete cheeseburger lunch servings.'
    ]
  },
  {
    name: 'Southern Fried Chicken',
    cat: 'cat-american-lunch',
    prep: 20,
    cook: 25,
    diff: 'Medium',
    img: dishImages.inasal,
    ings: ['ing-chicken', 'ing-flour', 'ing-egg', 'ing-peppercorn', 'ing-cooking-oil'],
    steps: [
      'Marinate 1kg Chicken: Cut 1kg chicken into 8 pieces. Marinate in 2 beaten eggs, 1 tbsp peppercorns, and salt for 30 minutes.',
      'Prepare Seasoned Dredge: Whisk 1 cup flour, 1 tsp salt, and pepper in a wide shallow pan.',
      'Coat 8 Pieces: Dredge 8 chicken pieces thoroughly into seasoned flour mixture twice for thick coating.',
      'Deep Fry Golden: Heat 3 tbsp oil in skillet to 350°F (175°C). Deep fry 8 chicken pieces for 15 minutes turning once until golden crisp.',
      'Portion 4 Plates: Serve 2 fried chicken pieces per plate to yield 4 crispy chicken lunches.'
    ]
  },
  {
    name: 'Creamy Macaroni and Cheese',
    cat: 'cat-american-lunch',
    prep: 15,
    cook: 25,
    diff: 'Easy',
    img: dishImages.pancit,
    ings: ['ing-pasta', 'ing-cheddar', 'ing-butter', 'ing-heavy-cream', 'ing-flour'],
    steps: [
      'Boil Macaroni: Boil 400g macaroni pasta in salted water for 8 minutes until al dente, then drain.',
      'Make Cheese Sauce: Melt 50g butter, whisk 1 cup flour, pour 1 cup heavy cream, and melt 150g sharp cheddar cheese for 6 minutes.',
      'Combine Pasta Sauce: Fold boiled 400g macaroni into creamy cheese sauce until evenly coated.',
      'Bake Cheesy Top: Transfer into baking dish, top with extra cheddar, and bake at 375°F for 15 minutes until bubbly golden.',
      'Divide 4 Portions: Scoop into 4 bowls to serve 4 generous mac & cheese portions.'
    ]
  },
  {
    name: 'BBQ Pork Ribs',
    cat: 'cat-american-dinner',
    prep: 20,
    cook: 90,
    diff: 'Medium',
    img: dishImages.kaldereta,
    ings: ['ing-pork-ribs', 'ing-tomato-sauce', 'ing-brown-sugar', 'ing-garlic', 'ing-vinegar'],
    steps: [
      'Dry Rub 1kg Ribs: Season 1kg pork ribs with 3 tbsp brown sugar, 1 head garlic, salt, and smoked paprika for 10 minutes.',
      'Slow Bake Foil: Wrap 1kg ribs in foil and bake slow at 325°F for 75 minutes until tender.',
      'Make BBQ Sauce: Simmer 1 cup tomato sauce, 2 tbsp vinegar, and 1 tbsp brown sugar for 5 minutes.',
      'Caramelize Glaze: Brush BBQ sauce over ribs and broil for 5 minutes until sticky brown.',
      'Slice 4 Portions: Cut rib rack into 4 equal portions to serve 4 dinner plates.'
    ]
  },
  {
    name: 'New England Clam Chowder',
    cat: 'cat-american-dinner',
    prep: 15,
    cook: 30,
    diff: 'Medium',
    img: dishImages.bulalo,
    ings: ['ing-potatoes', 'ing-pork-belly', 'ing-heavy-cream', 'ing-butter', 'ing-onion'],
    steps: [
      'Crisp Pork Belly: Sauté 1kg diced pork belly in pot for 7 minutes until crispy; remove crisp bits.',
      'Simmer Potatoes: Sauté 2 onions and 50g butter, add 2 diced potatoes and stock; simmer for 15 minutes.',
      'Add Cream: Stir 1 cup heavy cream into potato soup, simmering for 5 minutes over low heat.',
      'Combine Bacon Crispies: Stir reserved crispy pork belly back into creamy soup base.',
      'Divide 4 Bowls: Ladle steaming chowder into 4 soup bowls for 4 dinner servings.'
    ]
  },
  {
    name: 'Pulled Pork Sandwich',
    cat: 'cat-american-dinner',
    prep: 20,
    cook: 120,
    diff: 'Medium',
    img: dishImages.menudo,
    ings: ['ing-pork-shoulder', 'ing-brown-sugar', 'ing-vinegar', 'ing-tomato-sauce', 'ing-garlic'],
    steps: [
      'Slow Roast 800g Pork: Season 800g pork shoulder with 3 tbsp brown sugar, garlic, and 1/2 cup vinegar. Roast covered at 300°F for 2 hours.',
      'Shred Pork Meat: Use two forks to shred roasted 800g pork shoulder into fine tender strands.',
      'Simmer BBQ Glaze: Toss shredded pork with 1 cup tomato sauce and simmer for 10 minutes.',
      'Prepare 4 Buns: Toast 4 hamburger buns lightly.',
      'Build 4 Sandwiches: Pile pulled pork into 4 buns to serve 4 delicious dinner sandwiches.'
    ]
  },
  {
    name: 'Buffalo Chicken Wings',
    cat: 'cat-american-dinner',
    prep: 15,
    cook: 25,
    diff: 'Easy',
    img: dishImages.inasal,
    ings: ['ing-chicken', 'ing-butter', 'ing-chili', 'ing-vinegar', 'ing-garlic'],
    steps: [
      'Bake 1kg Wings: Season 1kg chicken wings and bake at 400°F (200°C) for 25 minutes until skin is golden crispy.',
      'Melt Spicy Sauce: Melt 50g butter in saucepan, whisk 3 chilies, 1/2 cup vinegar, and garlic for 3 minutes.',
      'Toss 1kg Wings: Coat hot baked wings thoroughly in spicy buffalo sauce mixture.',
      'Divide 4 Portions: Divide 1kg buffalo wings into 4 baskets or plates.',
      'Serve 4 Dinners: Serve 4 portion baskets alongside celery sticks and dipping sauce.'
    ]
  },
  {
    name: 'American Apple Pie',
    cat: 'cat-american-merienda',
    prep: 25,
    cook: 45,
    diff: 'Medium',
    img: dishImages.lumpia,
    ings: ['ing-apples', 'ing-flour', 'ing-butter', 'ing-brown-sugar', 'ing-egg'],
    steps: [
      'Toss Spiced Apples: Slice 3 fresh apples and toss with 3 tbsp brown sugar and 1 tsp cinnamon.',
      'Roll Butter Crust: Roll 1 cup flour dough with 50g butter into pie crust, lining a 9-inch dish.',
      'Fill & Lattice: Fill dish with spiced apples, cover lattice top crust, and brush with 1 beaten egg.',
      'Bake Golden: Bake at 375°F for 45 minutes until top crust is golden brown and bubbling.',
      'Slice 4 Slices: Slice pie into 4 generous slices to serve 4 dessert portions.'
    ]
  },
  {
    name: 'New York Style Cheesecake',
    cat: 'cat-american-merienda',
    prep: 30,
    cook: 60,
    diff: 'Hard',
    img: dishImages.pancit,
    ings: ['ing-heavy-cream', 'ing-egg', 'ing-butter', 'ing-brown-sugar', 'ing-flour'],
    steps: [
      'Press Crust: Mix 1 cup flour, 3 tbsp brown sugar, and 50g butter; press into pan and bake 8 minutes.',
      'Whip Cream Batter: Beat 1 cup heavy cream, 2 eggs, and 1/2 cup sugar for 5 minutes until smooth.',
      'Bake Water Bath: Pour batter into crust, bake in water bath at 325°F for 60 minutes.',
      'Chill Overnight: Cool inside oven for 1 hour, then refrigerate for 6 hours until set.',
      'Slice 4 Portions: Cut into 4 thick creamy cheesecake slices to yield 4 servings.'
    ]
  }
];

module.exports = { americanDishes };
