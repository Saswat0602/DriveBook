# AGENT.md

## Project Name

MotoLedger - Vehicle Maintenance Tracker

---

# Mission

Build a production-ready Android application using Expo React Native and TypeScript.

The application helps users manage vehicle maintenance completely offline.

The application must be:

* Fast
* Offline-first
* Privacy-first
* Simple
* Maintainable
* Scalable
* Production-ready

The goal is to publish the application to the Google Play Store.

---

# Core Principles

## 1. Simplicity First

Prefer simple solutions over complex ones.

Avoid:

* Over-engineering
* Premature optimization
* Unnecessary abstractions

Every piece of code should have a clear purpose.

---

## 2. Offline First

The application must work without internet.

Requirements:

* No backend
* No Firebase
* No API dependencies
* No account system

All user data must remain on-device.

---

## 3. Clean Architecture

Follow a layered architecture.

```text
UI Layer
↓
Feature Layer
↓
Business Logic Layer
↓
Data Layer
↓
Storage Layer
```

UI must never directly access SQLite.

All database operations must go through repositories.

---

## 4. Type Safety

Use TypeScript everywhere.

Rules:

* No any
* No ts-ignore
* Strict typing enabled
* Explicit return types

Bad:

```ts
const user: any = {};
```

Good:

```ts
const vehicle: Vehicle = {};
```

---

# Tech Stack

## Framework

Expo React Native

## Language

TypeScript

## Navigation

React Navigation

## Database

Expo SQLite

## State Management

Zustand

## Forms

React Hook Form

## Validation

Zod

## Notifications

Expo Notifications

## Charts

react-native-chart-kit

---

# Folder Structure

```text
src/

app/

components/
components/ui/
components/common/

features/

features/dashboard/
features/vehicles/
features/fuel/
features/services/
features/reminders/
features/reports/

database/

repositories/

services/

hooks/

navigation/

store/

types/

constants/

utils/

theme/

assets/
```

---

# Architecture Rules

## Components

Components must be:

* Small
* Reusable
* Focused

Maximum responsibility:

One component = One purpose

Bad:

```text
VehicleScreen
  handles UI
  handles database
  handles business logic
```

Good:

```text
VehicleScreen

VehicleList
VehicleCard
VehicleActions
```

---

## Screens

Screens should:

* Display data
* Trigger actions

Screens should NOT:

* Query SQLite directly
* Contain business logic

---

## Repositories

Repositories are the only place allowed to interact with SQLite.

Example:

```text
VehicleRepository

createVehicle()
updateVehicle()
deleteVehicle()
getVehicles()
```

---

## Services

Services contain business logic.

Examples:

```text
MileageCalculatorService

calculateMileage()
calculateAverageMileage()
```

```text
ReminderService

scheduleReminder()
cancelReminder()
```

---

# Database Standards

Use migrations.

Never write database code directly inside components.

Create tables during initialization.

Use transactions where appropriate.

Indexes should be added for:

```sql
vehicle_id
date
```

Performance matters.

---

# UI Guidelines

## Design Style

Modern

Clean

Minimal

No visual clutter.

---

## Spacing

Use 8-point spacing system.

```text
4
8
16
24
32
40
48
```

Avoid random values.

---

## Border Radius

Use:

```text
8
12
16
20
```

Consistently.

---

## Shadows

Minimal.

Avoid heavy shadows.

---

## Typography

Maximum:

```text
Heading
Subheading
Body
Caption
```

No more than four text styles.

---

# State Management

Use Zustand.

Rules:

Global state only when needed.

Examples:

Good:

```text
Current Vehicle
Theme
Settings
```

Bad:

```text
Single Input Field
Modal Visibility
```

Use local state for UI-only behavior.

---

# Error Handling

Every async operation must have:

```ts
try
catch
finally
```

Never swallow errors.

Always provide user feedback.

Example:

```text
Failed to save fuel log.

Please try again.
```

---

# Forms

Use:

React Hook Form

Zod Validation

Every form must validate:

* Required fields
* Numeric ranges
* Dates

Before saving.

---

# Performance Requirements

App launch:

< 2 seconds

List scrolling:

60 FPS

Database queries:

< 100ms

No unnecessary re-renders.

Use:

```ts
memo
useMemo
useCallback
```

Only when beneficial.

---

# Accessibility

All buttons require:

```tsx
accessibilityLabel
```

Touch targets:

Minimum 44px

Support:

* Light Mode
* Dark Mode

---

# Naming Conventions

## Components

```text
VehicleCard.tsx
FuelLogForm.tsx
ServiceHistoryList.tsx
```

PascalCase

---

## Hooks

```text
useVehicles.ts
useFuelLogs.ts
```

---

## Stores

```text
vehicleStore.ts
settingsStore.ts
```

---

## Types

```text
vehicle.types.ts
fuel.types.ts
```

---

# Code Quality

Follow:

SOLID principles

Especially:

* Single Responsibility Principle
* Dependency Inversion

---

# Prohibited Practices

Never use:

* any
* console.log in production
* duplicated code
* hardcoded colors
* magic numbers
* direct SQLite access in UI
* large components (>300 lines)
* large functions (>50 lines)

---

# Testing Checklist

Before every feature is complete:

## Functional

* Create record
* Edit record
* Delete record
* View record

## Edge Cases

* Empty states
* Invalid input
* Large datasets
* App restart

## Persistence

Verify data survives:

* App close
* App restart
* Device reboot

---

# Security

Never collect:

* Email
* Phone Number
* Location
* Contacts

No analytics.

No tracking.

No hidden data collection.

Privacy is a feature.

---

# Definition of Done

A feature is complete only if:

* TypeScript passes
* ESLint passes
* No runtime errors
* UI works on Android
* Dark mode works
* Data persists correctly
* Validation exists
* Error handling exists

---

# Development Order

Phase 1

* Project setup
* Navigation
* Theme system
* SQLite setup

Phase 2

* Vehicle management

Phase 3

* Fuel logs

Phase 4

* Service records

Phase 5

* Reminders

Phase 6

* Analytics

Phase 7

* Backup and restore

Phase 8

* Testing
* Optimization
* Play Store preparation

---

# Final Goal

Deliver a clean, maintainable, offline-first application that feels fast, reliable, and trustworthy.

Code should be understandable by a new developer within 30 minutes of opening the project.

Prioritize maintainability over cleverness.

When in doubt, choose the simpler solution.

