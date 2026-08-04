import { Recipe } from '../../types/recipe';
import { OnlineRecipe } from './types';

/** Extract YouTube video ID from a YouTube URL */
export function getYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
  if (match && match[2] && match[2].length === 11) {
    return match[2];
  }
  return null;
}

/** Build a full-screen YouTube embed HTML string */
export function getYouTubeHtml(videoId: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body, html { background-color: #000; height: 100%; width: 100%; overflow: hidden; }
    iframe { width: 100%; height: 100%; border: 0; }
  </style>
</head>
<body>
  <iframe
    src="https://www.youtube.com/embed/${videoId}?playsinline=1&rel=0&autoplay=0&enablejsapi=1&origin=https%3A%2F%2Fwww.youtube.com&widget_referrer=https%3A%2F%2Fwww.youtube.com"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</body>
</html>
  `;
}

/** Parse a raw instructions string into an array of step strings */
export function parseInstructions(text: string): string[] {
  if (!text) return [];
  const lines = text
    .split(/\r?\n|\r/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (lines.length > 1) {
    return lines.map((l) =>
      l.replace(/^STEP\s*\d+[:.]?\s*/i, '').replace(/^\d+[:.]\s*/, '')
    );
  }

  return text
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);
}

/** Convert an OnlineRecipe to the local Recipe shape used by RecipeCard */
export function toRecipeObject(item: OnlineRecipe): Recipe {
  return {
    id: `online-${item.idMeal}`,
    title: item.strMeal,
    description: item.strCategory,
    imageUrl: item.strMealThumb,
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'Easy',
    categoryId: item.strCategory,
    cuisine: item.strArea,
    calories: 450,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
