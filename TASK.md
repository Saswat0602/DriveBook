# TASKS.md

# MotoLedger

Vehicle Maintenance Tracker

---

# Project Goal

Build a production-ready offline-first vehicle maintenance tracking application using Expo React Native and TypeScript.

The application must be Play Store ready.

---

# Rules Before Starting

Before implementing any feature:

* Read AGENT.md
* Follow architecture rules
* Follow coding standards
* Follow folder structure
* Do not skip validation
* Do not skip error handling
* Do not create unnecessary abstractions

---

# Phase 0 - Project Setup

## Objective

Create project foundation.

---

### [x] Task 0.1

Initialize Expo project.

Requirements:

* Expo SDK latest stable
* TypeScript enabled

Acceptance Criteria:

* Project runs successfully
* No TypeScript errors

---

### [x] Task 0.2

Install dependencies.

Required packages:

```text id="3ydkpq"
expo-sqlite
expo-notifications

@react-navigation/native
@react-navigation/bottom-tabs
@react-navigation/native-stack

zustand

react-hook-form
zod

react-native-chart-kit

react-native-safe-area-context

expo-document-picker
expo-file-system
```

Acceptance Criteria:

* All packages installed
* App builds successfully

---

### [x] Task 0.3

Create folder structure.

Acceptance Criteria:

```text id="95l2im"
src/

app/
components/
database/
features/
hooks/
navigation/
repositories/
services/
store/
theme/
types/
utils/
```

Exists and organized.

---

### [x] Task 0.4

Configure ESLint and Prettier.

Acceptance Criteria:

* Lint passes
* Format command works

---

# Phase 1 - Theme System

## Objective

Create application design system.

---

### [x] Task 1.1

Create color palette.

Support:

* Light Theme
* Dark Theme

Acceptance Criteria:

* Theme switching works

---

### [x] Task 1.2

Create reusable UI components.

Components:

```text id="jll9qf"
Button
Input
Card
Screen
EmptyState
LoadingState
SectionHeader
```

Acceptance Criteria:

Reusable across app.

---

# Phase 2 - Database Foundation

## Objective

Create local storage layer.

---

### [x] Task 2.1

Initialize SQLite database.

Acceptance Criteria:

Database created on startup.

---

### [x] Task 2.2

Create migrations.

Tables:

```text id="wb4d0q"
vehicles
fuel_logs
service_records
reminders
```

Acceptance Criteria:

Tables automatically created.

---

### [x] Task 2.3

Create repository layer.

Repositories:

```text id="zpgxqx"
VehicleRepository
FuelRepository
ServiceRepository
ReminderRepository
```

Acceptance Criteria:

CRUD operations implemented.

---

# Phase 3 - Vehicle Management

## Objective

Users can manage vehicles.

---

### [x] Task 3.1

Create Vehicle model.

Acceptance Criteria:

Types defined.

---

### [x] Task 3.2

Build Add Vehicle Screen.

Fields:

* Name
* Registration Number
* Vehicle Type
* Brand
* Model
* Purchase Date
* Odometer

Acceptance Criteria:

Vehicle saved successfully.

---

### [x] Task 3.3

Build Vehicle List Screen.

Acceptance Criteria:

* List vehicles
* Empty state
* Loading state

---

### [x] Task 3.4

Build Edit Vehicle Screen.

Acceptance Criteria:

Vehicle updates correctly.

---

### [x] Task 3.5

Build Delete Vehicle flow.

Acceptance Criteria:

Confirmation modal shown.

---

# Phase 4 - Dashboard

## Objective

Create home screen.

---

### [x] Task 4.1

Create dashboard layout.

Display:

* Selected vehicle
* Total fuel cost
* Total maintenance cost
* Upcoming reminders

Acceptance Criteria:

Dashboard populated correctly.

---

### [x] Task 4.2

Create Quick Action buttons.

Buttons:

* Add Fuel Log
* Add Service
* Add Reminder

Acceptance Criteria:

Navigation works.

---

# Phase 5 - Fuel Logs

## Objective

Track fuel expenses.

---

### [x] Task 5.1

Create FuelLog model.

Acceptance Criteria:

Types defined.

---

### [x] Task 5.2

Create Add Fuel Log Screen.

Fields:

* Date
* Odometer
* Fuel Amount
* Cost
* Fuel Type

Acceptance Criteria:

Fuel entry saved.

---

### [x] Task 5.3

Create Fuel History Screen.

Acceptance Criteria:

Entries displayed correctly.

---

### [x] Task 5.4

Create Edit Fuel Log Screen.

Acceptance Criteria:

Update works.

---

### [x] Task 5.5

Create Delete Fuel Log flow.

Acceptance Criteria:

Delete confirmed.

---

### [x] Task 5.6

Mileage Calculator Service.

Calculations:

```text id="lvnfls"
Current Odometer
-
Previous Odometer

÷

Fuel Amount
```

Acceptance Criteria:

Mileage calculated correctly.

---

# Phase 6 - Service Records

## Objective

Track vehicle maintenance.

---

### [x] Task 6.1

Create ServiceRecord model.

Acceptance Criteria:

Types defined.

---

### [x] Task 6.2

Create Add Service Screen.

Fields:

* Date
* Odometer
* Service Type
* Cost
* Notes

Acceptance Criteria:

Service saved.

---

### [x] Task 6.3

Create Service History Screen.

Acceptance Criteria:

Entries visible.

---

### [x] Task 6.4

Create Edit Service Screen.

Acceptance Criteria:

Update works.

---

### [x] Task 6.5

Create Delete Service Screen.

Acceptance Criteria:

Delete works.

---

# Phase 7 - Reminder System

## Objective

Notify users about important dates.

---

### [x] Task 7.1

Configure notifications.

Acceptance Criteria:

Permission flow works.

---

### [x] Task 7.2

Create Reminder model.

Acceptance Criteria:

Types created.

---

### [x] Task 7.3

Create Add Reminder Screen.

Fields:

* Title
* Due Date
* Reminder Type
* Notes

Acceptance Criteria:

Reminder saved.

---

### [x] Task 7.4

Schedule notifications.

Notify:

```text id="2sdbx5"
30 days before
15 days before
7 days before
1 day before
```

Acceptance Criteria:

Notifications trigger correctly.

---

# Phase 8 - Reports

## Objective

Create analytics.

---

### [x] Task 8.1

Fuel analytics.

Metrics:

* Monthly fuel cost
* Average mileage

Acceptance Criteria:

Data accurate.

---

### [x] Task 8.2

Service analytics.

Metrics:

* Monthly maintenance cost
* Yearly maintenance cost

Acceptance Criteria:

Data accurate.

---

### [x] Task 8.3

Charts.

Charts:

* Fuel spending
* Service spending

Acceptance Criteria:

Charts render properly.

---

# Phase 9 - Backup & Restore

## Objective

Prevent data loss.

---

### [x] Task 9.1

Export backup.

Format:

```json id="l1m22z"
{
  "vehicles": [],
  "fuelLogs": [],
  "serviceRecords": [],
  "reminders": []
}
```

Acceptance Criteria:

JSON exported successfully.

---

### [x] Task 9.2

Import backup.

Acceptance Criteria:

Data restored successfully.

---

### [x] Task 9.3

Backup validation.

Acceptance Criteria:

Invalid files rejected safely.

---

# Phase 10 - Settings

## Objective

Create settings screen.

---

### [x] Task 10.1

Theme settings.

Acceptance Criteria:

Dark mode toggle works.

---

### [x] Task 10.2

Backup settings.

Acceptance Criteria:

Export/import accessible.

---

### [x] Task 10.3

Reset App Data.

Acceptance Criteria:

Confirmation required.

---

# Phase 11 - Search & Filters

## Objective

Improve usability.

---

### Task 11.1

Fuel log filters.

Filters:

* Month
* Year

Acceptance Criteria:

Results filtered correctly.

---

### Task 11.2

Service filters.

Filters:

* Service Type
* Date Range

Acceptance Criteria:

Results filtered correctly.

---

# Phase 12 - Quality Assurance

## Objective

Production readiness.

---

### Task 12.1

TypeScript validation.

Acceptance Criteria:

Zero TS errors.

---

### Task 12.2

Lint validation.

Acceptance Criteria:

Zero lint errors.

---

### Task 12.3

Performance review.

Acceptance Criteria:

* No slow screens
* No unnecessary renders

---

### Task 12.4

Dark mode audit.

Acceptance Criteria:

Every screen supported.

---

### Task 12.5

Offline audit.

Acceptance Criteria:

Disable internet.

App still functions completely.

---

# Phase 13 - Play Store Release

## Objective

Publish application.

---

### Task 13.1

Create app icon.

---

### Task 13.2

Create splash screen.

---

### Task 13.3

Create screenshots.

Required:

* Home
* Fuel Logs
* Services
* Reports

---

### Task 13.4

Generate production build.

Acceptance Criteria:

Android APK builds successfully.

---

### Task 13.5

Final Checklist

* No crashes
* No TypeScript errors
* No lint errors
* Dark mode works
* Notifications work
* Backup works
* Restore works
* Offline works
* Play Store ready

---

# Stretch Goals (Version 2)

Only after MVP ships.

Features:

* Receipt image storage
* Vehicle document vault
* PDF export
* Multiple currencies
* Fuel price trends
* Home screen widgets
* Android Auto support

DO NOT START VERSION 2 UNTIL VERSION 1 IS PUBLISHED.
