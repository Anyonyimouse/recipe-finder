# 📄 Product Requirements Document (PRD)
# BingCart v1.0

---

# 1. Project Overview

## Introduction

BingCart is an offline-first mobile recipe application that helps users discover meals based on the ingredients they already have at home. Instead of searching by recipe name, users select one or more ingredients, and BingCart displays recipes that can be prepared using those ingredients.

The application stores recipes locally using SQLite, allowing users to browse recipes without an internet connection. When internet is available, The application synchronizes recipe data from Supabase into a local SQLite database. Recipes are initially imported from TheMealDB and managed through Supabase. to keep the local database current.

BingCart is designed to provide a fast, lightweight, and seamless cooking experience without requiring user accounts or authentication.

---

# 2. Problem Statement

Many people struggle to decide what to cook with the ingredients they already have. Most recipe applications require an internet connection, focus on recipe-name searches, or include unnecessary social features.

Users need an application that:

- Works completely offline.
- Finds recipes based on available ingredients.
- Provides step-by-step cooking instructions.
- Updates its recipe database automatically when internet is available.
- Does not require account registration or login.

---

# 3. Goals

The primary goals of BingCart are:

- Build an offline-first recipe application.
- Allow users to search recipes using selected ingredients.
- Provide detailed cooking instructions.
- Store recipes locally for instant access.
- Synchronize recipe updates from Supabase.
- Deliver a simple and intuitive user experience.
- Maintain high performance even with thousands of recipes.

---

# 4. Target Users

## Primary Users

- Students
- Busy professionals
- Parents
- Home cooks
- People with limited internet access

## User Characteristics

Users who:

- Want quick meal ideas
- Already have ingredients at home
- Prefer offline applications
- Want easy-to-follow recipes
- Do not want to create an account

---

# 5. User Stories

### Recipe Discovery

As a user,

I want to select ingredients,

so that I can discover recipes I can cook.

---

### Recipe Details

As a user,

I want to view cooking instructions,

so that I can prepare meals correctly.

---

### Offline Access

As a user,

I want recipes to work without internet,

so that I can cook anytime.

---

### Favorites

As a user,

I want to save favorite recipes,

so that I can access them quickly later.

---

### Automatic Updates

As a user,

I want new recipes to download automatically,

so that my recipe library stays up to date.

---

# 6. MVP Features

## Recipe Search

- Search using ingredients
- Multiple ingredient selection
- Fast local search

## Recipe Details

- Recipe image
- Preparation time
- Difficulty
- Ingredients list
- Step-by-step instructions

## Favorites

- Save favorite recipes
- Remove favorites
- View favorite recipes

## Offline Database

- SQLite storage
- Instant loading
- Offline searching

Recipe Synchronization

- Synchronize recipes from Supabase
- Recipes originate from TheMealDB
- Download updates automatically
- Offline search using SQLite
---

# 7. Functional Requirements

## Ingredient Selection

The application shall:

- Display all available ingredients.
- Allow multiple ingredient selection.
- Allow ingredient search.
- Allow ingredient removal.

The application shall synchronize recipe updates from Supabase when an internet connection is available.

Recipes shall be stored locally in SQLite.

The application shall continue functioning when synchronization is unavailable.
---

## Recipe Search

The application shall:

- Search recipes using selected ingredients.
- Filter recipes by cuisine (Filipino, Italian, American, Asian).
- Filter recipes by meal type (Breakfast, Lunch, Dinner, Merienda).
- Filter recipes by calorie thresholds (Low Calorie: Light Meal ≤ 400 kcal, Balanced ≤ 600 kcal).
- Display matching recipes.
- Sort results by relevance.
- Display recipes instantly from SQLite.


---

## Recipe Details

The application shall display:

- Recipe name
- Recipe image
- Cooking time
- Difficulty
- Ingredients with interactive Portion Calculator (- / + stepper & 1 Solo, 2 Pax, 4 Family presets)
- Automatic quantity scaling and smart unit conversion (e.g. 1 kg for 4 servings → 250 g for 1 solo serving)
- Step-by-step cooking instructions
- Category


---

## Favorites

The application shall:

- Save favorite recipes locally.
- Remove favorite recipes.
- Display favorite recipes.

---

## Synchronization

The application shall:

- Check for internet connection.
- Download updated recipes from Supabase.
- Update SQLite automatically.
- Continue functioning if synchronization fails.

---

# 8. Non-Functional Requirements

## Performance

- Recipe search should complete within 300 ms.
- App startup should take less than 3 seconds.
- Smooth scrolling at 60 FPS.

---

## Offline Availability

- Core features must work without internet.
- SQLite is the primary data source.

---

## Reliability

- Application should gracefully handle network failures.
- Synchronization errors should never affect offline functionality.

---

## Maintainability

- Feature-based architecture.
- Clean Architecture.
- Repository Pattern.
- Modular components.

---

## Scalability

Support:

- 10,000+ recipes
- 5,000+ ingredients

without noticeable performance degradation.

---

# 9. User Flow

## Application Startup

```text
Launch App
      │
      ▼
Load SQLite Database
      │
      ▼
Check Internet Connection
      │
      ├───────────────┐
      │               │
      ▼               ▼
Offline          Online
      │               │
      │        Sync Recipes
      │               │
      └───────┬───────┘
              ▼
         Home Screen
```

---

## Recipe Search

```text
Select Ingredients
        │
        ▼
Search SQLite
        │
        ▼
Display Matching Recipes
        │
        ▼
Select Recipe
        │
        ▼
Recipe Details
        │
        ▼
Cooking Instructions
        │
        ▼
Save Favorite (Optional)
```

---

# 10. Future Features

Version 2

- Meal planner
- Shopping list
- Barcode scanner
- Nutrition information
- Voice-guided cooking

Version 3

- AI recipe recommendations
- Smart ingredient suggestions
- Seasonal recipes
- Recipe ratings
- Multi-language support

---

# 11. Milestones

## Phase 1

- Complete documentation
- Finalize UI design
- Design database
- Setup project architecture

---

## Phase 2

- Setup Expo project
- Configure NativeWind
- Configure SQLite
- Setup Supabase

---

## Phase 3

- Ingredient selection
- Recipe search
- Recipe details
- Favorites

---

## Phase 4

- Offline database
- Synchronization
- Performance optimization

---

## Phase 5

- Testing
- Bug fixing
- UI polish
- Production build

---

# Success Metrics

The MVP will be considered successful if:

- Users can find recipes using selected ingredients.
- Recipe search works completely offline.
- Recipe synchronization works reliably.
- Favorites are stored locally.
- App startup is under 3 seconds.
- Search results appear in under 300 milliseconds.
- No authentication is required.
- Architecture is maintainable and scalable.

---

# Out of Scope (Version 1)

The following features are intentionally excluded:

- User accounts
- Login and registration
- Recipe uploads
- Comments
- Ratings
- Social sharing
- Cloud favorites
- Push notifications
- Meal planning
- Grocery list generation
- AI-powered recommendations