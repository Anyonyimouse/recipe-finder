const { dishImages } = require('../images.data');

const italianDishes = [
  {
    name: 'Italian Frittata',
    cat: 'cat-italian-breakfast',
    prep: 10,
    cook: 15,
    diff: 'Easy',
    img: dishImages.silog,
    ings: ['ing-egg', 'ing-onion', 'ing-garlic', 'ing-mozzarella', 'ing-cooking-oil'],
    steps: [
      'Beat & Season Eggs: In a large bowl, whisk 6 fresh eggs with 1/2 tsp sea salt, 1/4 tsp cracked black pepper, and 2 tbsp cold water until smooth.',
      'Sauté Aromatics: Heat 2 tbsp olive oil in a 10-inch skillet over medium heat. Sauté 2 finely chopped onions and 1 head crushed garlic for 4 minutes until golden.',
      'Pour & Layer Cheese: Reduce heat to medium-low. Pour egg mixture over onions and garlic, then layer 200g diced fresh mozzarella cheese across the top without stirring.',
      'Bake Puffy: Cover skillet and cook on low heat for 8 minutes until edges set, then finish under oven broiler for 3 minutes until puffy and golden.',
      'Portion & Serve: Slice frittata into 4 equal triangular wedges and serve warm for 4 breakfast portions.'
    ]
  },
  {
    name: 'Classic Margherita Pizza',
    cat: 'cat-italian-lunch',
    prep: 20,
    cook: 15,
    diff: 'Medium',
    img: dishImages.afritada,
    ings: ['ing-flour', 'ing-diced-tomatoes', 'ing-mozzarella', 'ing-garlic', 'ing-cooking-oil'],
    steps: [
      'Stretch Pizza Dough: Roll 1 cup all-purpose flour dough on a lightly floured surface into a 12-inch round pizza crust.',
      'Prepare Tomato Sauce: Blend 1 can diced tomatoes with 1 head minced garlic, 2 tbsp olive oil, and 1/2 tsp salt; simmer for 10 minutes until thick.',
      'Assemble Pizza Base: Spread 1/2 cup tomato sauce over dough, leaving a 1/2-inch border along the crust edges.',
      'Top Mozzarella: Distribute 200g fresh mozzarella cheese slices evenly across the tomato sauce with fresh basil leaves.',
      'Bake & Portion: Bake at 475°F (245°C) for 12 to 14 minutes until crust is crispy. Cut into 4 large slices to yield 4 portions.'
    ]
  },
  {
    name: 'Spaghetti Carbonara',
    cat: 'cat-italian-lunch',
    prep: 15,
    cook: 20,
    diff: 'Medium',
    img: dishImages.pancit,
    ings: ['ing-pasta', 'ing-pork-belly', 'ing-egg', 'ing-parmesan', 'ing-peppercorn'],
    steps: [
      'Boil Pasta: Boil 400g spaghetti in 4 liters of salted water for 9 minutes until al dente, reserving 1 cup starchy pasta water.',
      'Crisp Pancetta: Heat 1 tbsp oil in a skillet. Sauté 1kg diced pork belly or pancetta for 7 minutes until crispy golden.',
      'Mix Egg Cheese Sauce: Whisk 4 egg yolks, 2 whole eggs, 100g grated parmesan cheese, and 1 tbsp peppercorns in a bowl.',
      'Combine & Toss: Toss hot drained 400g spaghetti into skillet with crispy pork. Remove from heat, pour egg mixture rapidly while stirring with pasta water to form creamy sauce.',
      'Portion Bowls: Divide evenly into 4 warm pasta bowls for 4 generous servings, topping with extra grated parmesan.'
    ]
  },
  {
    name: 'Fettuccine Alfredo',
    cat: 'cat-italian-lunch',
    prep: 10,
    cook: 15,
    diff: 'Easy',
    img: dishImages.pancit,
    ings: ['ing-pasta', 'ing-butter', 'ing-heavy-cream', 'ing-parmesan', 'ing-garlic'],
    steps: [
      'Boil Fettuccine: Cook 400g fettuccine pasta in boiling salted water for 9 minutes until tender-chewy, then drain.',
      'Melt Garlic Butter: Melt 50g butter in a deep skillet over medium heat. Sauté 1 head minced garlic for 1 minute until fragrant.',
      'Simmer Cream: Pour 1 cup heavy cream into skillet and simmer gently over low heat for 4 minutes until cream thickens.',
      'Melt Parmesan: Whisk in 100g freshly grated parmesan cheese until sauce is rich and smooth, then fold in hot 400g fettuccine.',
      'Portion & Serve: Divide into 4 equal pasta bowls to serve 4 portions garnished with fresh parsley.'
    ]
  },
  {
    name: 'Lasagna Bolognese',
    cat: 'cat-italian-dinner',
    prep: 30,
    cook: 50,
    diff: 'Hard',
    img: dishImages.kaldereta,
    ings: ['ing-pasta', 'ing-ground-beef', 'ing-tomato-sauce', 'ing-mozzarella', 'ing-parmesan', 'ing-onion'],
    steps: [
      'Simmer Bolognese Sauce: Sauté 2 chopped onions and garlic in oil. Add 500g ground beef, browning for 8 minutes, then pour 1 cup tomato sauce and simmer 30 minutes.',
      'Boil Sheets: Cook 400g lasagna sheets in boiling water for 6 minutes until pliable, then lay flat on towels.',
      'Layer Lasagna Dish: Spread meat sauce in a 9x13 dish, top with pasta sheets, meat sauce, 200g mozzarella, and 100g parmesan. Repeat 3 layers.',
      'Bake Golden: Bake covered at 375°F (190°C) for 35 minutes, then uncover for 10 minutes until top turns golden bubbly.',
      'Rest & Slice Portions: Cool for 15 minutes, then slice into 4 equal rectangular portions for 4 dinner servings.'
    ]
  },
  {
    name: 'Chicken Cacciatore',
    cat: 'cat-italian-dinner',
    prep: 15,
    cook: 40,
    diff: 'Medium',
    img: dishImages.afritada,
    ings: ['ing-chicken', 'ing-diced-tomatoes', 'ing-bell-pepper', 'ing-onion', 'ing-garlic', 'ing-cooking-oil'],
    steps: [
      'Sear Chicken Cutlets: Season 1kg chicken thighs with salt and pepper. Heat 3 tbsp oil in a pot and sear chicken for 8 minutes until golden.',
      'Sauté Veggies: Remove chicken. Sauté 2 sliced onions, 1 bell pepper, and 1 head garlic in pot for 6 minutes until soft.',
      'Simmer Tomato Sauce: Add 1 can diced tomatoes and 1/2 cup broth, scraping up browned bits from bottom of pot.',
      'Simmer Tender: Return 1kg chicken to pot, cover, and simmer over low heat for 30 minutes until meat is fork-tender.',
      'Portion Platter: Divide 1kg chicken and rich sauce into 4 equal plates for 4 dinner servings.'
    ]
  },
  {
    name: 'Risotto alla Milanese',
    cat: 'cat-italian-dinner',
    prep: 10,
    cook: 30,
    diff: 'Hard',
    img: dishImages.tinola,
    ings: ['ing-rice', 'ing-butter', 'ing-onion', 'ing-parmesan', 'ing-garlic'],
    steps: [
      'Warm Chicken Broth: Heat 4 cups chicken broth in a saucepan over low heat to keep warm.',
      'Toast Arborio Rice: Melt 50g butter in a pot, sauté 2 minced onions for 3 minutes, then add 3 cups arborio rice, toasting for 2 minutes.',
      'Add Broth Gradually: Add warm broth 1 ladleful at a time, stirring continuously for 20 minutes as rice absorbs broth.',
      'Mantecatura Finish: Off heat, stir 50g butter and 100g grated parmesan cheese vigorously for 2 minutes until creamy.',
      'Plate 4 Portions: Ladle creamy saffron-golden risotto onto 4 shallow plates to serve 4 portions.'
    ]
  },
  {
    name: 'Chicken Parmigiana',
    cat: 'cat-italian-dinner',
    prep: 20,
    cook: 25,
    diff: 'Medium',
    img: dishImages.afritada,
    ings: ['ing-chicken', 'ing-tomato-sauce', 'ing-egg', 'ing-breadcrumbs', 'ing-mozzarella', 'ing-parmesan'],
    steps: [
      'Bread 4 Cutlets: Pound 1kg chicken breasts into 4 equal cutlets. Dip into 2 beaten eggs, then coat in 1 cup panko breadcrumbs and 100g parmesan.',
      'Pan Fry Crispy: Heat 3 tbsp oil in skillet and fry 4 cutlets for 4 minutes per side until crisp golden.',
      'Top Sauce & Mozzarella: Place 4 cutlets on tray, spoon 1 cup tomato sauce over each, and top with 200g mozzarella cheese.',
      'Bake Cheesy Melt: Bake at 400°F (200°C) for 12 minutes until cheese melts bubbling.',
      'Serve 4 Cutlets: Plate 1 cutlet per dish to yield 4 complete dinner servings alongside pasta.'
    ]
  },
  {
    name: 'Italian Tiramisu',
    cat: 'cat-italian-merienda',
    prep: 25,
    cook: 0,
    diff: 'Medium',
    img: dishImages.pancit,
    ings: ['ing-egg', 'ing-condensed-milk', 'ing-heavy-cream', 'ing-flour'],
    steps: [
      'Whisk Yolk Cream: Whisk 2 egg yolks and 1/2 cup sugar over simmering water for 6 minutes until pale creamy.',
      'Whip Cream Base: Fold 1 cup heavy cream and 1 can condensed milk into egg mixture until velvety smooth.',
      'Dip Biscuit Layer: Dip ladyfinger biscuits in espresso coffee and line bottom of dish in a single layer.',
      'Layer & Chill: Spread cream over biscuits, repeat second layer, dust with cocoa powder, and chill for 4 hours.',
      'Cut 4 Portions: Slice tiramisu into 4 equal dessert squares to serve 4 portions.'
    ]
  },
  {
    name: 'Vanilla Panna Cotta',
    cat: 'cat-italian-merienda',
    prep: 15,
    cook: 10,
    diff: 'Easy',
    img: dishImages.pancit,
    ings: ['ing-heavy-cream', 'ing-brown-sugar', 'ing-evaporated-milk'],
    steps: [
      'Bloom Gelatin: Sprinkle gelatin powder over 3 tbsp cold water, letting bloom for 5 minutes.',
      'Warm Sweet Cream: Combine 1 cup heavy cream, 1 can evaporated milk, and 3 tbsp brown sugar in saucepan; warm for 5 minutes until sugar dissolves.',
      'Dissolve Gelatin: Remove cream from heat, stir in gelatin slurry until completely dissolved.',
      'Pour 4 Ramekins: Pour warm cream mixture evenly into 4 individual dessert ramekins.',
      'Chill & Serve: Refrigerate for 4 hours until set. Unmold into 4 plates to serve 4 sweet dessert portions.'
    ]
  }
];

module.exports = { italianDishes };
