# BingCart Design System v1.0

## Brand Identity
BingCart is a fresh, modern, and accessible recipe search app designed for home cooks. The visual language utilizes a rich dark-mode theme by default with vibrant Emerald/Teal accents representing freshness and natural ingredients.

## Color Palette (NativeWind / Tailwind Tokens)

### Backgrounds
- Primary Background: `bg-slate-950` (`#020617`)
- Surface / Card: `bg-slate-900` (`#0f172a`)
- Elevated Surface: `bg-slate-800` (`#1e293b`)
- Border / Divider: `border-slate-800` / `border-slate-700`

### Brand Accents
- Primary Accent (Fresh Green): `emerald-500` (`#10b981`), `emerald-400` (`#34d399`)
- Secondary Accent (Clean Cyan): `cyan-500` (`#06b6d4`), `cyan-400` (`#22d3ee`)
- Amber / Warm Accent (Time & Prep): `amber-400` (`#fbbf24`)
- Rose / Crimson Accent (Favorites & Tags): `rose-500` (`#f43f5e`)

### Typography
- Headings: Bold / ExtraBold, Crisp white (`text-slate-50`, `text-slate-100`)
- Body Text: `text-slate-300`
- Muted / Secondary: `text-slate-400` / `text-slate-500`

## Spacing Grid
Follows strict **8-point grid**:
- Micro: `p-1` (4px), `p-2` (8px)
- Base: `p-3` (12px), `p-4` (16px)
- Section: `p-6` (24px), `p-8` (32px)

## Components

### Ingredient Chips (`IngredientChip.tsx`)
- Unselected: `bg-slate-800 border-slate-700 text-slate-300`
- Selected: `bg-emerald-500/20 border-emerald-500 text-emerald-300`
- Interactive hover/press states with haptic feedback support.

### Recipe Cards (`RecipeCard.tsx`)
- Elevated dark slate cards with rounded corners (`rounded-2xl`).
- High quality image header with gradient overlay (`expo-image`).
- Quick badges for cooking time, difficulty, and matching ingredient count.

### Navigation
- Bottom tab bar: Elevated dark container with Lucide icons (`Utensils`, `Heart`, `RefreshCw`).