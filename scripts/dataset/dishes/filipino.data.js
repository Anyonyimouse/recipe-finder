const { dishImages } = require('../images.data');

const filipinoDishes = [
  {
    name: 'Chicken Adobo',
    cat: 'cat-filipino-lunch',
    prep: 15,
    cook: 35,
    diff: 'Easy',
    img: dishImages.adobo,
    ings: ['ing-chicken', 'ing-soy-sauce', 'ing-vinegar', 'ing-garlic', 'ing-bay-leaves', 'ing-peppercorn'],
    steps: [
      'Marinate 1kg Chicken: Combine 1kg chicken, 0.5 cup soy sauce, 1 head crushed garlic, 1 tbsp peppercorns, and 4 bay leaves in a bowl for 30 minutes.',
      'Sear Chicken: Heat 3 tbsp oil in skillet, seared 1kg chicken pieces for 8 minutes until golden brown.',
      'Boil 0.5 Cup Vinegar: Pour marinade and 0.5 cup cane vinegar; boil uncovered for 5 minutes over medium heat.',
      'Low Simmer: Cover and simmer over low heat for 25 minutes until chicken is tender.',
      'Portion 4 Bowls: Reduce sauce for 5 minutes and serve over 3 cups rice across 4 bowls (yields 4 servings).'
    ]
  },
  {
    name: 'Pork Adobo',
    cat: 'cat-filipino-dinner',
    prep: 15,
    cook: 45,
    diff: 'Easy',
    img: dishImages.adobo,
    ings: ['ing-pork-belly', 'ing-soy-sauce', 'ing-vinegar', 'ing-garlic', 'ing-bay-leaves', 'ing-peppercorn'],
    steps: [
      'Marinate 1kg Pork: Cut 1kg pork belly into cubes, marinate in 0.5 cup soy sauce, 1 head garlic, and 1 tbsp peppercorns for 30 minutes.',
      'Sear & Render Fat: Sear pork belly in skillet for 10 minutes until fat renders and edges brown.',
      'Boil 0.5 Cup Vinegar: Add 0.5 cup cane vinegar and 4 bay leaves; boil uncovered for 5 minutes.',
      'Simmer Tender: Cover and simmer on low heat for 35 minutes until melt-in-your-mouth tender.',
      'Divide 4 Plates: Fry pork in rendered fat for 5 minutes and portion into 4 warm dinner plates (4 servings).'
    ]
  },
  {
    name: 'Adobong Sitaw',
    cat: 'cat-filipino-dinner',
    prep: 10,
    cook: 20,
    diff: 'Easy',
    img: dishImages.adobo,
    ings: ['ing-string-beans', 'ing-pork-belly', 'ing-soy-sauce', 'ing-vinegar', 'ing-garlic', 'ing-onion'],
    steps: [
      'Sauté Pork & Aromatics: Heat 3 tbsp oil; sauté 1kg pork belly with 1 head garlic and 2 onions for 5 minutes.',
      'Stir-Fry 10 Sitaw: Add 10 string beans (cut) and stir-fry over high heat for 3 minutes.',
      'Simmer Sauce: Pour 0.5 cup soy sauce and 0.5 cup cane vinegar, simmering for 5 minutes.',
      'Portion 4 Servings: Divide adobong sitaw into 4 bowls to serve 4 dinner portions.'
    ]
  },
  {
    name: 'Adobong Kangkong',
    cat: 'cat-filipino-dinner',
    prep: 10,
    cook: 15,
    diff: 'Easy',
    img: dishImages.adobo,
    ings: ['ing-water-spinach', 'ing-garlic', 'ing-soy-sauce', 'ing-vinegar', 'ing-peppercorn'],
    steps: [
      'Sauté 1 Head Garlic: Heat 3 tbsp oil; sauté 1 head crushed garlic for 2 minutes until golden.',
      'Stir-Fry Kangkong: Add 1 bunch kangkong stems first for 2 minutes, then add leaves.',
      'Season Sauce: Pour 0.5 cup soy sauce, 0.5 cup vinegar, and 1 tbsp peppercorns for 3 minutes.',
      'Portion 4 Plates: Serve hot across 4 side dishes to yield 4 portions.'
    ]
  },
  {
    name: 'Adobong Pusit',
    cat: 'cat-filipino-dinner',
    prep: 15,
    cook: 20,
    diff: 'Medium',
    img: dishImages.adobo,
    ings: ['ing-squid', 'ing-vinegar', 'ing-garlic', 'ing-onion', 'ing-chili', 'ing-soy-sauce'],
    steps: [
      'Prep 500g Squid: Clean 500g squid, reserving black ink sacs.',
      'Sauté Aromatics: Sauté 1 head garlic, 2 onions, and 3 chilies in 3 tbsp oil for 4 minutes.',
      'Simmer Ink Sauce: Add squid, ink, 0.5 cup soy sauce, and 0.5 cup vinegar; simmer 10 minutes.',
      'Portion 4 Bowls: Serve squid in black ink sauce into 4 bowls for 4 dinner servings.'
    ]
  },
  {
    name: 'Sinigang na Baboy',
    cat: 'cat-filipino-lunch',
    prep: 20,
    cook: 50,
    diff: 'Medium',
    img: dishImages.sinigang,
    ings: ['ing-pork-ribs', 'ing-tamarind', 'ing-onion', 'ing-water-spinach', 'ing-eggplant', 'ing-string-beans', 'ing-chili', 'ing-fish-sauce'],
    steps: [
      'Boil 1kg Pork Ribs: Boil 1kg pork ribs with 2 onions in 6 cups water for 40 minutes.',
      'Sour Broth: Add 1 pack tamarind mix and 3 tbsp fish sauce; boil 5 minutes.',
      'Cook Veggies: Add 2 eggplants and 10 sitaw string beans; simmer for 5 minutes.',
      'Steam Greens: Add 1 bunch kangkong and 3 chilies, cover and steam 3 minutes.',
      'Portion 4 Soup Bowls: Ladle rich sour pork soup into 4 large soup bowls (4 servings).'
    ]
  },
  {
    name: 'Sinigang na Hipon',
    cat: 'cat-filipino-lunch',
    prep: 15,
    cook: 20,
    diff: 'Easy',
    img: dishImages.sinigang,
    ings: ['ing-shrimp', 'ing-tamarind', 'ing-onion', 'ing-water-spinach', 'ing-chili', 'ing-fish-sauce'],
    steps: [
      'Boil Sour Base: Boil 2 onions and 1 pack tamarind mix in 5 cups water for 5 minutes.',
      'Cook 500g Shrimp: Add 500g fresh shrimp and 3 chilies; boil for 5 minutes until pink.',
      'Steam Kangkong: Add 1 bunch kangkong leaves, turn off heat, and steam 2 minutes.',
      'Portion 4 Servings: Divide shrimp soup into 4 bowls to serve 4 lunch portions.'
    ]
  },
  {
    name: 'Sinigang na Baboy at Hipon',
    cat: 'cat-filipino-lunch',
    prep: 20,
    cook: 45,
    diff: 'Medium',
    img: dishImages.sinigang,
    ings: ['ing-pork-ribs', 'ing-shrimp', 'ing-tamarind', 'ing-onion', 'ing-water-spinach', 'ing-eggplant', 'ing-string-beans', 'ing-chili', 'ing-fish-sauce'],
    steps: [
      'Boil 1kg Pork Ribs: Boil 1kg pork ribs with 2 onions in 6 cups water for 35 minutes until tender.',
      'Sour Broth & Veggies: Add 1 pack tamarind mix, 3 tbsp fish sauce, 2 eggplants, and 10 sitaw; simmer for 5 minutes.',
      'Add 500g Shrimp: Add 500g fresh whole shrimp and 3 green chilies; boil for 4 minutes until shrimp turn bright pink.',
      'Steam Kangkong: Add 1 bunch fresh kangkong leaves, cover pot, and steam off heat for 2 minutes.',
      'Portion 4 Combo Bowls: Ladle rich pork and shrimp sinigang into 4 large soup bowls (yields 4 generous servings).'
    ]
  },
  {
    name: 'Sinigang na Bangus',
    cat: 'cat-filipino-lunch',
    prep: 15,
    cook: 25,
    diff: 'Easy',
    img: dishImages.sinigang,
    ings: ['ing-bangus', 'ing-tamarind', 'ing-onion', 'ing-water-spinach', 'ing-chili', 'ing-fish-sauce'],
    steps: [
      'Boil Tamarind Stock: Boil 2 onions, 3 tbsp fish sauce, and 1 pack tamarind mix in 5 cups water.',
      'Cook 2 Bangus Fish: Add 2 milkfish (bangus cut into 4 belly portions); simmer 8 minutes.',
      'Add Greens: Add 3 chilies and 1 bunch kangkong; simmer 3 minutes.',
      'Portion 4 Dishes: Serve 1 bangus portion per bowl across 4 soup bowls.'
    ]
  },
  {
    name: 'Sinigang na Baka',
    cat: 'cat-filipino-lunch',
    prep: 20,
    cook: 90,
    diff: 'Medium',
    img: dishImages.sinigang,
    ings: ['ing-beef-brisket', 'ing-tamarind', 'ing-onion', 'ing-string-beans', 'ing-eggplant', 'ing-chili'],
    steps: [
      'Slow Simmer 1kg Beef: Boil 1kg beef brisket with 2 onions in 6 cups water for 60 minutes.',
      'Sour Broth & Veggies: Add 1 pack tamarind mix, 10 sitaw, and 2 eggplants; simmer 8 minutes.',
      'Season Patis: Add 3 tbsp fish sauce and 3 chilies; simmer 3 minutes.',
      'Portion 4 Bowls: Divide tender beef broth into 4 large bowls to serve 4.'
    ]
  },
  {
    name: 'Beef Bulalo',
    cat: 'cat-filipino-lunch',
    prep: 20,
    cook: 120,
    diff: 'Medium',
    img: dishImages.bulalo,
    ings: ['ing-beef-shank', 'ing-onion', 'ing-peppercorn', 'ing-fish-sauce', 'ing-potatoes', 'ing-carrots'],
    steps: [
      'Parboil 1.5kg Shank: Boil 1.5kg beef shank for 10 minutes, drain and rinse marrow bone.',
      'Slow Simmer Marrow: Simmer beef shank with 2 onions and 1 tbsp peppercorns for 120 minutes until tender.',
      'Add Root Veggies: Add 2 potatoes and 2 carrots; simmer covered for 15 minutes.',
      'Season Broth: Add 3 tbsp fish sauce and simmer for 5 minutes.',
      'Portion 4 Plates: Divide beef marrow shank and vegetables into 4 large serving bowls (4 servings).'
    ]
  },
  {
    name: 'Kare-Kare',
    cat: 'cat-filipino-lunch',
    prep: 30,
    cook: 90,
    diff: 'Hard',
    img: dishImages.karekare,
    ings: ['ing-beef-brisket', 'ing-peanut-butter', 'ing-annatto', 'ing-eggplant', 'ing-string-beans', 'ing-shrimp-paste'],
    steps: [
      'Simmer 1kg Beef: Boil 1kg beef brisket for 60 minutes, reserving 3 cups broth.',
      'Whisk Peanut Sauce: Whisk 0.5 cup peanut butter and 2 tbsp annatto into warm broth for 3 minutes.',
      'Thicken Gravy: Sauté 1 head garlic and 2 onions, add peanut broth, simmer 10 minutes.',
      'Add Veggies: Fold 2 eggplants and 10 sitaw; simmer for 5 minutes.',
      'Portion 4 Plates: Serve with 3 tbsp bagoong shrimp paste across 4 dinner plates.'
    ]
  },
  {
    name: 'Crispy Lechon Kawali',
    cat: 'cat-filipino-dinner',
    prep: 15,
    cook: 60,
    diff: 'Medium',
    img: dishImages.lechon,
    ings: ['ing-pork-belly', 'ing-garlic', 'ing-bay-leaves', 'ing-peppercorn', 'ing-cooking-oil'],
    steps: [
      'Boil 1kg Pork Belly: Boil 1kg pork belly with 1 head garlic, 4 bay leaves, and 1 tbsp peppercorns for 45 minutes.',
      'Air Dry Skin: Dry pork belly in refrigerator for 60 minutes.',
      'Deep Fry Crackling: Deep fry 1kg pork belly in 3 tbsp oil for 15 minutes until skin crackles.',
      'Slice Cubes: Chop into bite-sized crispy pork cubes.',
      'Portion 4 Plates: Divide crispy lechon kawali into 4 serving plates (4 servings).'
    ]
  },
  {
    name: 'Sizzling Pork Sisig',
    cat: 'cat-filipino-dinner',
    prep: 25,
    cook: 40,
    diff: 'Medium',
    img: dishImages.sisig,
    ings: ['ing-pork-belly', 'ing-onion', 'ing-red-chili', 'ing-calamansi', 'ing-egg', 'ing-soy-sauce'],
    steps: [
      'Boil & Charcoal Grill: Boil 1kg pork belly for 20 minutes, then grill for 15 minutes.',
      'Dice 1/4-Inch: Dice grilled pork belly into fine 1/4-inch cubes.',
      'Sauté Aromatics: Sauté 2 onions, 4 red chilies, 4 calamansi, and 0.5 cup soy sauce for 8 minutes.',
      'Sizzling Plate: Heat plate, melt butter, add sisig, and crack 2 eggs on top.',
      'Portion 4 Plates: Serve sizzling sisig split into 4 portions.'
    ]
  },
  {
    name: 'Tinolang Manok',
    cat: 'cat-filipino-lunch',
    prep: 15,
    cook: 35,
    diff: 'Easy',
    img: dishImages.tinola,
    ings: ['ing-chicken', 'ing-ginger', 'ing-garlic', 'ing-onion', 'ing-green-papaya', 'ing-fish-sauce'],
    steps: [
      'Sauté Ginger Base: Sauté 1 thumb ginger, 1 head garlic, and 2 onions in 3 tbsp oil for 4 minutes.',
      'Sear 1kg Chicken: Add 1kg chicken and 3 tbsp fish sauce, searing for 6 minutes.',
      'Simmer Papaya Broth: Add 5 cups water and 1 green papaya; simmer for 25 minutes.',
      'Portion 4 Bowls: Ladle chicken ginger soup into 4 bowls for 4 lunch servings.'
    ]
  },
  {
    name: 'Beef Kaldereta',
    cat: 'cat-filipino-dinner',
    prep: 25,
    cook: 75,
    diff: 'Medium',
    img: dishImages.kaldereta,
    ings: ['ing-beef-brisket', 'ing-tomato-sauce', 'ing-liver-spread', 'ing-potatoes', 'ing-carrots', 'ing-bell-pepper', 'ing-chili'],
    steps: [
      'Sear 1kg Beef: Sear 1kg beef brisket in 3 tbsp oil for 8 minutes until browned.',
      'Simmer Sauce: Add 1 cup tomato sauce, 0.5 cup liver spread, and broth; simmer for 60 minutes.',
      'Add Veggies: Add 2 potatoes, 2 carrots, 1 bell pepper, and 3 chilies; simmer 10 minutes.',
      'Portion 4 Servings: Scoop beef kaldereta into 4 dinner plates.'
    ]
  },
  {
    name: 'Chicken Afritada',
    cat: 'cat-filipino-lunch',
    prep: 15,
    cook: 35,
    diff: 'Easy',
    img: dishImages.afritada,
    ings: ['ing-chicken', 'ing-tomato-sauce', 'ing-potatoes', 'ing-carrots', 'ing-bell-pepper', 'ing-onion'],
    steps: [
      'Sauté 1kg Chicken: Sauté 2 onions and 1kg chicken in 3 tbsp oil for 8 minutes.',
      'Simmer Tomato Base: Add 1 cup tomato sauce, 2 potatoes, and 2 carrots; simmer for 20 minutes.',
      'Add Bell Peppers: Add 1 bell pepper and simmer 5 minutes.',
      'Portion 4 Plates: Divide chicken afritada into 4 lunch plates.'
    ]
  },
  {
    name: 'Pork Menudo',
    cat: 'cat-filipino-lunch',
    prep: 20,
    cook: 40,
    diff: 'Easy',
    img: dishImages.menudo,
    ings: ['ing-pork-shoulder', 'ing-tomato-sauce', 'ing-potatoes', 'ing-carrots', 'ing-hotdog', 'ing-soy-sauce'],
    steps: [
      'Dice Match Items: Dice 800g pork shoulder, 2 hotdogs, 2 potatoes, and 2 carrots into cubes.',
      'Stew Pork: Sauté pork shoulder in 1 cup tomato sauce and 0.5 cup soy sauce for 25 minutes.',
      'Add Hotdogs & Veggies: Add hotdogs, potatoes, and carrots; simmer 10 minutes.',
      'Portion 4 Servings: Serve menudo over rice across 4 plates.'
    ]
  },
  {
    name: 'Bicol Express',
    cat: 'cat-filipino-dinner',
    prep: 15,
    cook: 35,
    diff: 'Medium',
    img: dishImages.bicolexpress,
    ings: ['ing-pork-belly', 'ing-coconut-milk', 'ing-shrimp-paste', 'ing-chili', 'ing-red-chili', 'ing-garlic'],
    steps: [
      'Sauté Pork & Bagoong: Sauté 1kg pork belly, 1 head garlic, and 3 tbsp bagoong for 7 minutes.',
      'Add 2 Cups Gata: Pour 2 cups coconut milk; simmer for 20 minutes.',
      'Load Chilies: Add 3 green chilies and 4 red chilies; simmer 8 minutes.',
      'Portion 4 Plates: Serve spicy Bicol Express across 4 dinner plates.'
    ]
  },
  {
    name: 'Laing',
    cat: 'cat-filipino-dinner',
    prep: 15,
    cook: 40,
    diff: 'Medium',
    img: dishImages.bicolexpress,
    ings: ['ing-taro-leaves', 'ing-coconut-milk', 'ing-shrimp-paste', 'ing-pork-belly', 'ing-red-chili', 'ing-ginger'],
    steps: [
      'Simmer 2 Cups Gata: Simmer 2 cups coconut milk with 1 thumb ginger, pork, and bagoong for 10 minutes.',
      'Layer Taro Leaves: Layer taro leaves without stirring; simmer for 20 minutes.',
      'Simmer Creamy: Add 4 red chilies and simmer 10 minutes.',
      'Portion 4 Bowls: Serve creamy laing into 4 dinner bowls.'
    ]
  },
  {
    name: 'Pinakbet Tagalog',
    cat: 'cat-filipino-lunch',
    prep: 20,
    cook: 25,
    diff: 'Easy',
    img: dishImages.pinakbet,
    ings: ['ing-squash', 'ing-eggplant', 'ing-bitter-gourd', 'ing-string-beans', 'ing-shrimp-paste', 'ing-pork-belly'],
    steps: [
      'Sauté Pork Belly: Sauté 1kg pork belly strips for 7 minutes.',
      'Add Bagoong: Add 3 tbsp bagoong shrimp paste; sauté 3 minutes.',
      'Steam Veggies: Layer 0.5 squash, 10 sitaw, 1 ampalaya, and 2 eggplants; steam 15 minutes.',
      'Portion 4 Servings: Scoop pinakbet into 4 lunch plates.'
    ]
  },
  {
    name: 'Ginisang Monggo',
    cat: 'cat-filipino-lunch',
    prep: 15,
    cook: 40,
    diff: 'Easy',
    img: dishImages.tinola,
    ings: ['ing-water-spinach', 'ing-pork-belly', 'ing-garlic', 'ing-onion', 'ing-fish-sauce', 'ing-chili'],
    steps: [
      'Boil Mung Beans: Boil mung beans for 30 minutes until soft.',
      'Sauté Pork: Sauté 1kg pork belly with 1 head garlic and 2 onions for 6 minutes.',
      'Combine & Kangkong: Combine beans and pork, add 1 bunch kangkong for 2 minutes.',
      'Portion 4 Bowls: Ladle ginisang monggo into 4 soup bowls.'
    ]
  },
  {
    name: 'Tortang Talong',
    cat: 'cat-filipino-breakfast',
    prep: 15,
    cook: 15,
    diff: 'Easy',
    img: dishImages.silog,
    ings: ['ing-eggplant', 'ing-egg', 'ing-garlic', 'ing-onion', 'ing-cooking-oil'],
    steps: [
      'Char 2 Eggplants: Char 2 eggplants over flame for 10 minutes and peel skin.',
      'Flatten & Dip Egg: Flatten eggplants with fork and dip into 2 beaten eggs.',
      'Pan Fry 2 Omelets: Fry in 3 tbsp oil for 4 minutes per side until golden.',
      'Portion 4 Plates: Cut into 4 portions to serve 4 breakfast plates.'
    ]
  },
  {
    name: 'Lumpia Shanghai',
    cat: 'cat-filipino-dinner',
    prep: 30,
    cook: 20,
    diff: 'Easy',
    img: dishImages.lumpia,
    ings: ['ing-ground-beef', 'ing-carrots', 'ing-onion', 'ing-egg', 'ing-lumpia-wrapper', 'ing-cooking-oil'],
    steps: [
      'Mix Meat Filling: Mix 500g ground beef, 2 carrots, 2 onions, and 2 eggs for 3 minutes.',
      'Wrap 20 Lumpia: Wrap filling into 20 lumpia wrappers tightly.',
      'Deep Fry Rolls: Fry in 3 tbsp oil for 6 minutes until crispy golden.',
      'Portion 4 Plates: Divide 20 rolls into 4 plates (5 rolls per serving).'
    ]
  },
  {
    name: 'Lumpiang Sariwa',
    cat: 'cat-filipino-lunch',
    prep: 25,
    cook: 20,
    diff: 'Medium',
    img: dishImages.lumpia,
    ings: ['ing-carrots', 'ing-string-beans', 'ing-tofu', 'ing-peanut-butter', 'ing-garlic', 'ing-lumpia-wrapper'],
    steps: [
      'Sauté Veggies: Sauté 2 carrots and 10 sitaw in 1 head garlic for 8 minutes.',
      'Wrap 4 Rolls: Wrap cooked veggies into 20 lumpia wrappers forming 4 large rolls.',
      'Simmer Peanut Sauce: Simmer 0.5 cup peanut butter for 5 minutes and drizzle over rolls.',
      'Portion 4 Plates: Serve 1 large fresh lumpia per plate for 4 servings.'
    ]
  },
  {
    name: 'Pancit Canton',
    cat: 'cat-filipino-merienda',
    prep: 20,
    cook: 20,
    diff: 'Easy',
    img: dishImages.pancit,
    ings: ['ing-pancit-canton', 'ing-chicken', 'ing-shrimp', 'ing-carrots', 'ing-soy-sauce', 'ing-garlic'],
    steps: [
      'Sauté Meats: Sauté 1kg chicken and 500g shrimp in 1 head garlic for 6 minutes.',
      'Add Broth & Veggies: Add broth, 0.5 cup soy sauce, and 2 carrots; simmer 5 minutes.',
      'Toss 250g Canton: Toss 250g canton noodles into wok for 5 minutes.',
      'Portion 4 Bowls: Serve pancit canton into 4 merienda plates.'
    ]
  },
  {
    name: 'Pancit Bihon Guisado',
    cat: 'cat-filipino-merienda',
    prep: 20,
    cook: 20,
    diff: 'Easy',
    img: dishImages.pancit,
    ings: ['ing-bihon', 'ing-pork-shoulder', 'ing-carrots', 'ing-soy-sauce', 'ing-garlic', 'ing-calamansi'],
    steps: [
      'Soak 250g Bihon: Soak 250g bihon noodles for 10 minutes.',
      'Sauté Pork & Veggies: Sauté 800g pork shoulder and 2 carrots in 0.5 cup soy sauce for 7 minutes.',
      'Toss Bihon: Toss bihon noodles into skillet for 5 minutes; serve with 4 calamansi.',
      'Portion 4 Plates: Divide bihon guisado into 4 merienda servings.'
    ]
  },
  {
    name: 'Pancit Palabok',
    cat: 'cat-filipino-merienda',
    prep: 25,
    cook: 25,
    diff: 'Medium',
    img: dishImages.pancit,
    ings: ['ing-bihon', 'ing-shrimp', 'ing-annatto', 'ing-egg', 'ing-calamansi', 'ing-fish-sauce'],
    steps: [
      'Boil 250g Noodles: Boil 250g bihon noodles for 8 minutes and drain.',
      'Cook Orange Sauce: Heat 2 tbsp annatto, 500g shrimp stock, and 3 tbsp fish sauce for 10 minutes.',
      'Garnish Platter: Pour orange sauce over noodles, top with 2 eggs and 4 calamansi.',
      'Portion 4 Servings: Divide palabok into 4 merienda plates.'
    ]
  },
  {
    name: 'Beef Tapsilog',
    cat: 'cat-filipino-breakfast',
    prep: 15,
    cook: 15,
    diff: 'Easy',
    img: dishImages.silog,
    ings: ['ing-beef-brisket', 'ing-soy-sauce', 'ing-calamansi', 'ing-garlic', 'ing-rice', 'ing-egg'],
    steps: [
      'Marinate Tapa: Marinate 1kg beef brisket in 0.5 cup soy sauce, 4 calamansi, and 1 head garlic for 30 minutes.',
      'Pan Fry Tapa: Fry beef tapa in 3 tbsp oil for 6 minutes until caramelized.',
      'Fry 3 Cups Rice: Fry 3 cups rice with garlic for 5 minutes.',
      'Fry 2 Eggs: Fry 2 eggs sunny-side up.',
      'Portion 4 Silog Plates: Serve tapa, garlic rice, and egg across 4 breakfast plates.'
    ]
  },
  {
    name: 'Pork Tocilog',
    cat: 'cat-filipino-breakfast',
    prep: 10,
    cook: 15,
    diff: 'Easy',
    img: dishImages.silog,
    ings: ['ing-pork-shoulder', 'ing-brown-sugar', 'ing-garlic', 'ing-rice', 'ing-egg'],
    steps: [
      'Simmer Tocino: Boil 800g pork shoulder tocino with 3 tbsp brown sugar and water for 10 minutes.',
      'Caramelize Tocino: Fry pork in rendered oil for 5 minutes until glazed.',
      'Fry 3 Cups Rice: Fry 3 cups garlic rice for 5 minutes.',
      'Fry 2 Eggs: Fry 2 eggs sunny-side up.',
      'Portion 4 Silog Plates: Serve tocino, garlic rice, and egg across 4 breakfast plates.'
    ]
  },
  {
    name: 'Bangsilog',
    cat: 'cat-filipino-breakfast',
    prep: 15,
    cook: 15,
    diff: 'Easy',
    img: dishImages.silog,
    ings: ['ing-bangus', 'ing-garlic', 'ing-vinegar', 'ing-rice', 'ing-egg'],
    steps: [
      'Marinate 2 Bangus: Marinate 2 milkfish in 0.5 cup vinegar and 1 head garlic for 30 minutes.',
      'Deep Fry Fish: Fry milkfish cut into 4 pieces in 3 tbsp oil for 6 minutes per side until crisp.',
      'Fry 3 Cups Rice: Fry 3 cups garlic rice for 5 minutes.',
      'Fry 2 Eggs: Fry 2 eggs sunny-side up.',
      'Portion 4 Silog Plates: Serve bangus, garlic rice, and egg across 4 plates (4 servings).'
    ]
  },
  {
    name: 'Chicken Inasal',
    cat: 'cat-filipino-dinner',
    prep: 20,
    cook: 30,
    diff: 'Medium',
    img: dishImages.inasal,
    ings: ['ing-chicken', 'ing-calamansi', 'ing-ginger', 'ing-garlic', 'ing-annatto', 'ing-vinegar'],
    steps: [
      'Marinate 1kg Chicken: Marinate 1kg chicken in 4 calamansi, 1 thumb ginger, 1 head garlic, and 0.5 cup vinegar for 60 minutes.',
      'Make Annatto Oil: Melt butter with 2 tbsp annatto seeds for 5 minutes.',
      'Grill & Baste: Grill chicken over charcoal for 20 minutes while basting with annatto oil.',
      'Portion 4 Plates: Serve 1kg grilled inasal chicken with 3 cups garlic rice across 4 plates.'
    ]
  },
  {
    name: 'Pork Igado',
    cat: 'cat-filipino-dinner',
    prep: 20,
    cook: 35,
    diff: 'Medium',
    img: dishImages.menudo,
    ings: ['ing-pork-shoulder', 'ing-bell-pepper', 'ing-soy-sauce', 'ing-vinegar', 'ing-garlic', 'ing-onion'],
    steps: [
      'Sauté Aromatics: Sauté 1 head garlic and 2 onions in 3 tbsp oil for 4 minutes.',
      'Cook 800g Pork: Add 800g pork shoulder strips; cook for 10 minutes.',
      'Simmer Sauce: Add 1 bell pepper, 0.5 cup soy sauce, and 0.5 cup vinegar; simmer 15 minutes.',
      'Portion 4 Servings: Divide Igado into 4 dinner plates.'
    ]
  },
  {
    name: 'Dinuguan (Pork Blood Stew)',
    cat: 'cat-filipino-dinner',
    prep: 20,
    cook: 40,
    diff: 'Medium',
    img: dishImages.adobo,
    ings: ['ing-pork-belly', 'ing-vinegar', 'ing-garlic', 'ing-onion', 'ing-chili', 'ing-bay-leaves'],
    steps: [
      'Sauté 1kg Pork: Sauté 1kg pork belly with 1 head garlic and 2 onions for 8 minutes.',
      'Pour Blood Sauce: Pour pork blood and 0.5 cup vinegar, stirring continuously for 5 minutes.',
      'Simmer 3 Chilies: Add 3 green chilies and 4 bay leaves; simmer for 25 minutes.',
      'Portion 4 Bowls: Serve dark pork dinuguan into 4 stew bowls.'
    ]
  },
  {
    name: 'Escabeche na Bangus',
    cat: 'cat-filipino-lunch',
    prep: 15,
    cook: 25,
    diff: 'Easy',
    img: dishImages.sinigang,
    ings: ['ing-bangus', 'ing-ginger', 'ing-bell-pepper', 'ing-vinegar', 'ing-brown-sugar', 'ing-onion'],
    steps: [
      'Fry 2 Milkfish: Fry 2 whole milkfish (cut into 4 pieces) in 3 tbsp oil for 12 minutes until crisp.',
      'Make Sweet & Sour Sauce: Sauté 1 thumb ginger, 1 bell pepper, 0.5 cup vinegar, and 3 tbsp brown sugar for 6 minutes.',
      'Pour Sauce: Pour sweet sour sauce over fried milkfish.',
      'Portion 4 Plates: Serve 1 fish piece per plate for 4 servings.'
    ]
  },
  {
    name: 'Kinilaw na Hipon',
    cat: 'cat-filipino-dinner',
    prep: 15,
    cook: 10,
    diff: 'Easy',
    img: dishImages.sinigang,
    ings: ['ing-shrimp', 'ing-calamansi', 'ing-vinegar', 'ing-ginger', 'ing-onion', 'ing-chili'],
    steps: [
      'Cure 500g Shrimp: Pour 4 calamansi and 0.5 cup vinegar over 500g raw shrimp for 15 minutes.',
      'Toss Aromatics: Drain liquid, toss with 1 thumb ginger, 2 onions, and 3 chilies for 2 minutes.',
      'Portion 4 Bowls: Serve fresh cured kinilaw chilled in 4 appetizer bowls.'
    ]
  },
  {
    name: 'Pork Mechado',
    cat: 'cat-filipino-lunch',
    prep: 20,
    cook: 50,
    diff: 'Medium',
    img: dishImages.kaldereta,
    ings: ['ing-pork-shoulder', 'ing-tomato-sauce', 'ing-potatoes', 'ing-carrots', 'ing-calamansi', 'ing-soy-sauce'],
    steps: [
      'Sear 800g Pork: Sear 800g pork shoulder in 3 tbsp oil for 7 minutes.',
      'Simmer Tomato Base: Add 1 cup tomato sauce, 0.5 cup soy sauce, and 4 calamansi; simmer 40 minutes.',
      'Add 2 Potatoes & Carrots: Add 2 potatoes and 2 carrots; simmer 12 minutes.',
      'Portion 4 Plates: Divide pork mechado into 4 dinner plates.'
    ]
  },
  {
    name: 'Champorado',
    cat: 'cat-filipino-breakfast',
    prep: 10,
    cook: 25,
    diff: 'Easy',
    img: dishImages.pancit,
    ings: ['ing-sticky-rice', 'ing-evaporated-milk', 'ing-condensed-milk', 'ing-brown-sugar'],
    steps: [
      'Boil 2 Cups Sticky Rice: Boil 2 cups sticky rice with cocoa powder in 4 cups water for 20 minutes.',
      'Sweeten Porridge: Stir in 3 tbsp brown sugar for 5 minutes until glossy.',
      'Swirl 1 Can Milk: Swirl 1 can evaporated milk and condensed milk over top.',
      'Portion 4 Bowls: Ladle champorado into 4 breakfast bowls.'
    ]
  },
  {
    name: 'Arroz Caldo',
    cat: 'cat-filipino-breakfast',
    prep: 15,
    cook: 35,
    diff: 'Easy',
    img: dishImages.tinola,
    ings: ['ing-rice', 'ing-chicken', 'ing-ginger', 'ing-garlic', 'ing-egg', 'ing-calamansi'],
    steps: [
      'Sauté Ginger Base: Sauté 1 thumb ginger, 1 head garlic, 2 onions, and 1kg chicken for 6 minutes.',
      'Simmer 3 Cups Rice: Add 3 cups rice and 5 cups broth; simmer 25 minutes.',
      'Garnish Eggs: Top with 2 hard-boiled eggs (halved into 4) and 4 calamansi.',
      'Portion 4 Bowls: Serve hot arroz caldo into 4 large bowls.'
    ]
  },
  {
    name: 'Turon (Banana Lumpia)',
    cat: 'cat-filipino-merienda',
    prep: 15,
    cook: 15,
    diff: 'Easy',
    img: dishImages.lumpia,
    ings: ['ing-saba-banana', 'ing-brown-sugar', 'ing-lumpia-wrapper', 'ing-cooking-oil'],
    steps: [
      'Roll 4 Bananas: Roll 4 saba bananas in 3 tbsp brown sugar.',
      'Wrap 20 Lumpia: Wrap in 20 lumpia wrappers tightly for 5 minutes.',
      'Caramelize Crisp: Fry in 3 tbsp oil while sprinkling sugar for 6 minutes.',
      'Portion 4 Plates: Divide 20 turon rolls across 4 plates (5 rolls per serving).'
    ]
  },
  {
    name: 'Halo-Halo',
    cat: 'cat-filipino-merienda',
    prep: 15,
    cook: 0,
    diff: 'Easy',
    img: dishImages.pancit,
    ings: ['ing-evaporated-milk', 'ing-condensed-milk', 'ing-saba-banana', 'ing-sticky-rice'],
    steps: [
      'Layer Preserves: Layer 4 saba bananas and preserves into 4 tall glasses.',
      'Mound Shaved Ice: Fill 4 glasses to the brim with finely shaved ice.',
      'Drizzle 1 Can Milk: Drizzle 1 can evaporated milk and condensed milk over shaved ice.',
      'Portion 4 Glasses: Serve 4 tall halo-halo dessert glasses.'
    ]
  }
];

module.exports = { filipinoDishes };
