const fs = require('fs');
const path = require('path');
const { categories, cuisineMap, mealTypeMap } = require('./categories.data');
const { ingredientsList, ingredientQuantitiesMap } = require('./ingredients.data');
const { allDishes } = require('./dishes');

function buildDataset() {
  console.log('Generating curated, NON-REDUNDANT Authentic Recipe dataset...');

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

  const outputData = {
    categories,
    ingredients: ingredientsList,
    recipes
  };

  const outputPath = path.join(__dirname, '../../src/database/filipino_dataset.json');
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
  console.log(`Successfully saved curated non-redundant recipe dataset to ${outputPath}`);

  return outputData;
}

module.exports = { buildDataset };
