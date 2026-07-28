# 📄 ARCHITECTURE.md
# BingCart Architecture v1.0

---

# Overview

## Introduction

BingCart is an offline-first mobile recipe application built with React Native and Expo. The application helps users discover recipes based on the ingredients they already have.

Unlike traditional recipe applications, BingCart does not require user accounts or an internet connection for normal operation. Every recipe is stored locally in SQLite, ensuring fast searches and reliable offline access.

When internet connectivity is available, BingCart synchronizes recipe updates from Supabase into the local SQLite database.

SQLite is always the application's runtime database.

---

## Architecture Goals

The architecture is designed to provide:

- Offline-first experience
- High performance
- Maintainability
- Scalability
- Separation of concerns
- Feature modularity
- Easy testing
- Reusable components

---

## Core Principles

- Offline First
- Feature-Based Architecture
- Clean Architecture
- Repository Pattern
- Single Source of Truth
- Dependency Inversion
- Reusable Components
- Simple over Complex

---

# Technology Stack

## Mobile Framework

React Native

Reason

Cross-platform mobile development.

---

## Framework

Expo

Reason

Simplifies development and deployment.

---

## Language

TypeScript

Reason

Type safety.

Maintainability.

Better tooling.

---

## Styling

NativeWind

Reason

Utility-first styling.

Reusable UI.

Consistent design.

---

## Navigation

Expo Router

Reason

File-based routing.

Scalable navigation.

---

## Local Database

SQLite (expo-sqlite)

Reason

Offline-first.

Fast local queries.

No additional server required.

---

## Cloud Database

Supabase PostgreSQL

Reason

Recipe synchronization.

Content management.

No authentication.

---

## State Management

Zustand

Reason

Simple.

Fast.

Minimal boilerplate.

---

## Server Synchronization

TanStack Query

Reason

Background synchronization.

Caching.

Retry handling.

---

## Images

Expo Image

Reason

Image caching.

Performance.

---

## Icons

Lucide React Native

Reason

Consistent icon system.

---

## Animations

React Native Reanimated

Reason

Smooth native animations.

---

# High-Level Architecture

```
                User

                  │

                  ▼

          Presentation Layer

                  │

                  ▼

             Domain Layer

                  │

                  ▼

          Repository Layer

        ┌─────────┴─────────┐

        │                   │

        ▼                   ▼

SQLite Database      Supabase Sync

        │

        ▼

 Local Runtime Data
```

---

# Folder Structure

```
src/

│

├── app/

│

├── assets/

│

├── components/

│     ├── ui/

│     ├── common/

│     └── layouts/

│

├── constants/

│

├── database/

│     ├── schema/

│     ├── migrations/

│     └── seed/

│

├── features/

│     ├── recipe/

│     ├── ingredient/

│     ├── favorite/

│     ├── search/

│     ├── settings/

│     └── sync/

│

├── hooks/

│

├── services/

│

├── store/

│

├── types/

│

├── utils/

│

└── config/
```

---

# Clean Architecture

BingCart follows Clean Architecture.

```
Presentation

↓

Domain

↓

Data
```

---

## Presentation Layer

Responsible for:

- Screens
- Components
- Navigation
- User interaction

Never:

- Query SQLite
- Call Supabase
- Execute SQL

---

## Domain Layer

Contains:

- Entities
- Repository Interfaces
- Business Rules
- Use Cases

No external dependencies.

---

## Data Layer

Contains:

- SQLite implementation
- Supabase implementation
- Repository implementation

Responsible for retrieving and saving data.

---

# Feature-Based Architecture

Every feature is independent.

Example

```
recipe/

presentation/

domain/

data/
```

Features

```
recipe/

ingredient/

favorite/

search/

settings/

sync/
```

Each feature owns:

- Components
- Hooks
- Use Cases
- Repository
- Models

Shared code belongs outside feature folders.

---

# Repository Pattern

The Repository Pattern is mandatory.

```
UI

↓

Use Case

↓

Repository

↓

SQLite

↓

Supabase (Sync Only)
```

The UI never communicates directly with SQLite.

Repositories decide where data comes from.

Responsibilities

- Query SQLite
- Save SQLite
- Synchronize Supabase
- Map database models
- Return domain models

---

# Offline-First Strategy

SQLite is the application's primary database.

The application always reads from SQLite.

Startup Flow

```
Launch App

↓

Load SQLite

↓

Display UI

↓

Check Internet

↓

If Available

↓

Synchronize Supabase

↓

Update SQLite

↓

Refresh UI
```

If synchronization fails:

- Continue using SQLite
- No interruption to the user

---

# SQLite Design

SQLite stores all runtime data.

Tables

- recipes
- ingredients
- recipe_ingredients
- recipe_steps
- favorites
- categories
- search_history
- sync_metadata

SQLite Responsibilities

- Recipe search
- Ingredient lookup
- Favorites
- Search history
- Offline cooking guide

No UI component should access SQLite directly.

Repositories are responsible for all queries.

---

# Supabase Synchronization

Supabase acts as the master content repository.

Responsibilities

- Recipe updates
- Ingredient updates
- Category updates
- Image URLs
- Database version

Synchronization Flow

```
Internet Available

↓

Check Version

↓

Version Changed?

↓

Yes

↓

Download Updates

↓

Repository

↓

SQLite Transaction

↓

Update sync_metadata

↓

Finished
```

No authentication.

No user profiles.

No cloud favorites.

---

# Data Flow

## Recipe Search

```
Home Screen

↓

Ingredient Selection

↓

Search Use Case

↓

Recipe Repository

↓

SQLite

↓

Matching Recipes

↓

Recipe List
```

---

## Recipe Detail

```
Recipe Card

↓

Recipe Repository

↓

SQLite

↓

Recipe Details

↓

Cooking Instructions
```

---

## Synchronization

```
Application Launch

↓

Sync Service

↓

Supabase

↓

Repository

↓

SQLite

↓

UI Refresh
```

---

# Dependency Rules

Dependencies always point inward.

```
Presentation

↓

Domain

↓

Data
```

Presentation depends on Domain.

Domain depends on nothing.

Data depends on Domain.

SQLite depends on nothing.

Supabase depends on nothing.

Forbidden

Presentation → SQLite

Presentation → Supabase

Component → SQL

Screen → Repository Implementation

---

# Error Handling

If SQLite fails

↓

Show local error message

If Supabase fails

↓

Ignore

↓

Continue Offline

Never crash because of synchronization.

---

# Performance Strategy

Use FlatList.

Index searchable columns.

Batch SQLite inserts.

Use transactions.

Cache images.

Memoize components.

Lazy load screens.

Avoid unnecessary re-renders.

Search should complete under 300ms.

App startup under 3 seconds.

---

# Security

No authentication.

No user accounts.

No personal data.

Use HTTPS.

Use parameterized SQL.

Validate downloaded data.

Never expose secrets.

---

# Future Scalability

Version 2

- Shopping List
- Meal Planner
- Barcode Scanner
- Nutrition Information

Version 3

- AI Recipe Suggestions
- Voice Cooking Assistant
- Multi-language Support
- Recipe Collections

Future Architecture

The architecture allows adding:

```
recipe/

shopping/

planner/

nutrition/

ai/

voice/
```

without modifying existing features.

---

# Architecture Decision Records

## ADR-001

SQLite chosen as runtime database.

Reason

Offline-first.

Fast local queries.

Simple deployment.

---

## ADR-002

Supabase chosen as synchronization backend.

Reason

Reliable PostgreSQL.

Easy synchronization.

Simple backend management.

---

## ADR-003

No Authentication.

Reason

Reduce friction.

Immediate usability.

No user management required.

---

## ADR-004

Feature-Based Architecture.

Reason

Independent modules.

Easy maintenance.

Scalable.

---

## ADR-005

Repository Pattern.

Reason

Decouples business logic from data sources.

Easy testing.

Future backend replacement.

---

# Summary

Architecture Style

Feature-Based Clean Architecture

Design Pattern

Repository Pattern

Primary Database

SQLite

Cloud Database

Supabase

Authentication

None

State Management

Zustand

Synchronization

TanStack Query

Navigation

Expo Router

Styling

NativeWind

Runtime

Offline First

Platform

React Native (Expo)

Language

TypeScript