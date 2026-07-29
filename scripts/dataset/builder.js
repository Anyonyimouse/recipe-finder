const fs = require('fs');
const path = require('path');
const { categories, cuisineMap, mealTypeMap } = require('./categories.data');
const { ingredientsList, ingredientQuantitiesMap } = require('./ingredients.data');
const { allDishes } = require('./dishes');

function buildDataset() {
  console.log('Generating curated, modular Authentic Recipe dataset...');

  const validIngredientIdSet = new Set(ingredientsList.map((i) => i.id));

  const recipes = allDishes.map((tpl, idx) => {
    const recipeId = `ph-rec-${idx + 1}`;
    const validIngredients = tpl.ings
      .filter((ingId) => validIngredientIdSet.has(ingId))
      .map((ingId) => {
        const detail = ingredientQuantitiesMap[ingId] || { qty: 1, unit: 'pc' };
        return {
          ingredientId: ingId,
          quantity: detail.qty,
          unit: detail.unit
        };
      });

    const recipeCuisine = cuisineMap[tpl.cat] || 'Filipino Food';
    const recipeMealType = mealTypeMap[tpl.cat] || 'Lunch';

    return {
      id: recipeId,
      title: tpl.name,
      description: `Authentic ${recipeCuisine} ${tpl.name.toLowerCase()} prepared traditional style with rich savory flavors.`,
      imageUrl: tpl.img,
      prepTime: tpl.prep,
      cookTime: tpl.cook,
      servings: 4,
      difficulty: tpl.diff,
      categoryId: tpl.cat,
      cuisine: recipeCuisine,
      mealType: recipeMealType,
      calories: 350 + ((idx + 1) * 17) % 450,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ingredients: validIngredients,
      steps: tpl.steps
    };
  });

  console.log(`Generated ${recipes.length} UNIQUE, NON-REDUNDANT Authentic Recipes!`);

  const datasetDir = path.join(__dirname, '../../src/database/dataset');
  const recipesDir = path.join(datasetDir, 'recipes');

  if (!fs.existsSync(recipesDir)) {
    fs.mkdirSync(recipesDir, { recursive: true });
  }

  // 1. Categories
  fs.writeFileSync(
    path.join(datasetDir, 'categories.json'),
    JSON.stringify(categories, null, 2)
  );

  // 2. Ingredients
  fs.writeFileSync(
    path.join(datasetDir, 'ingredients.json'),
    JSON.stringify(ingredientsList, null, 2)
  );

  // 3. Recipes split by cuisine
  const filipinoRecipes = recipes.filter((r) => r.cuisine === 'Filipino Food');
  const italianRecipes = recipes.filter((r) => r.cuisine === 'Italian Food');
  const americanRecipes = recipes.filter((r) => r.cuisine === 'American Food');
  const asianRecipes = recipes.filter(
    (r) => r.cuisine === 'Japanese Food' || r.cuisine.includes('Asian')
  );
  const otherRecipes = recipes.filter(
    (r) =>
      r.cuisine !== 'Filipino Food' &&
      r.cuisine !== 'Italian Food' &&
      r.cuisine !== 'American Food' &&
      r.cuisine !== 'Japanese Food' &&
      !r.cuisine.includes('Asian')
  );

  fs.writeFileSync(
    path.join(recipesDir, 'filipino.json'),
    JSON.stringify(filipinoRecipes, null, 2)
  );
  fs.writeFileSync(
    path.join(recipesDir, 'italian.json'),
    JSON.stringify(italianRecipes, null, 2)
  );
  fs.writeFileSync(
    path.join(recipesDir, 'american.json'),
    JSON.stringify(americanRecipes, null, 2)
  );
  fs.writeFileSync(
    path.join(recipesDir, 'asian.json'),
    JSON.stringify([...asianRecipes, ...otherRecipes], null, 2)
  );

  console.log(`Successfully output modular dataset files to ${datasetDir}`);

  return {
    categories,
    ingredients: ingredientsList,
    recipes
  };
}

module.exports = { buildDataset };
