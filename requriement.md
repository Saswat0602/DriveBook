# Vehicle Maintenance Tracker - Product Requirements Document (PRD)

## Project Overview

Build a mobile application called **Vehicle Maintenance Tracker** using **Expo React Native**.

The application must be:

* Fully offline
* No account required
* No backend
* No internet dependency
* Privacy-first
* Fast and lightweight
* Android-first (Play Store release)

Primary goal:

Help vehicle owners track:

* Fuel expenses
* Vehicle service history
* Insurance reminders
* Pollution certificate reminders
* Vehicle maintenance costs

All data must be stored locally on the device.

---

# Tech Stack

## Framework

* Expo React Native
* TypeScript

## Local Storage

Use one of:

* SQLite (preferred)
* Expo SQLite

## State Management

Choose one:

* Zustand (preferred)
* React Context

## Notifications

* Expo Notifications

## Charts

* react-native-chart-kit

## Navigation

* React Navigation

---

# Core Features

## 1. Vehicle Management

Users can create and manage multiple vehicles.

### Vehicle Fields

```ts
interface Vehicle {
  id: string;
  name: string;
  registrationNumber: string;
  vehicleType: "Bike" | "Car" | "Scooter" | "Other";
  brand: string;
  model: string;
  purchaseDate: string;
  currentOdometer: number;
  notes?: string;
}
```

### Actions

* Add vehicle
* Edit vehicle
* Delete vehicle
* View vehicle details
* Switch between vehicles

---

# 2. Dashboard

The dashboard should show:

## Vehicle Summary

* Vehicle name
* Registration number
* Current odometer

## Quick Stats

* Total fuel spent
* Total service spent
* Total maintenance spent
* Upcoming reminders

## Quick Actions

Buttons:

* Add Fuel Log
* Add Service Record
* Add Reminder

---

# 3. Fuel Log Management

Track all fuel entries.

## Fuel Entry Model

```ts
interface FuelLog {
  id: string;
  vehicleId: string;
  date: string;
  odometer: number;
  fuelAmountLitres: number;
  totalCost: number;
  fuelType: string;
  notes?: string;
}
```

## Features

* Add fuel entry
* Edit fuel entry
* Delete fuel entry
* View fuel history

## Calculations

### Mileage

Calculate:

```text
Distance Travelled / Fuel Used
```

Example:

```text
500 km / 10 litres = 50 kmpl
```

### Statistics

Show:

* Average mileage
* Total fuel cost
* Monthly fuel cost
* Fuel history chart

---

# 4. Service Records

Track maintenance activities.

## Service Record Model

```ts
interface ServiceRecord {
  id: string;
  vehicleId: string;
  date: string;
  odometer: number;
  serviceType: string;
  cost: number;
  notes?: string;
}
```

## Service Types

Examples:

* Oil Change
* Air Filter
* Brake Service
* Battery Replacement
* Tyre Replacement
* General Service
* Custom

## Features

* Add service
* Edit service
* Delete service
* Search service history

---

# 5. Reminder System

Users can set reminders.

## Reminder Types

* Insurance
* Pollution Certificate
* Driving License
* Service Due
* Custom Reminder

## Reminder Model

```ts
interface Reminder {
  id: string;
  vehicleId: string;
  title: string;
  dueDate: string;
  reminderType: string;
  notes?: string;
}
```

## Features

* Add reminder
* Edit reminder
* Delete reminder
* Notification support

## Notification Schedule

Notify:

* 30 days before
* 15 days before
* 7 days before
* 1 day before

---

# 6. Reports & Analytics

## Fuel Analytics

Display:

* Monthly fuel spending
* Average mileage
* Fuel trend graph

## Service Analytics

Display:

* Monthly service cost
* Annual maintenance cost
* Most common service type

## Dashboard Cards

Examples:

```text
Fuel Spent This Month
₹2500

Service Cost This Month
₹1200

Average Mileage
48 kmpl
```

---

# 7. Search & Filters

Users should be able to filter:

## Fuel Logs

By:

* Date
* Month
* Year

## Service Records

By:

* Service type
* Date range

---

# 8. Backup & Restore

Critical Feature

Since app is offline-only.

## Export Backup

Export all data to JSON.

Example:

```json
{
  "vehicles": [],
  "fuelLogs": [],
  "serviceRecords": [],
  "reminders": []
}
```

## Restore Backup

Import JSON backup.

### Supported Locations

* Downloads
* Device storage
* Shared file

---

# 9. Data Deletion

Users can:

* Delete single record
* Delete vehicle
* Delete all data

Add confirmation dialogs.

---

# 10. Settings

## Settings Screen

Options:

* Dark mode
* Export backup
* Import backup
* Reset app data
* About app

---

# User Interface Requirements

## Design Principles

* Minimal
* Modern
* Fast
* Material Design inspired

## Theme

Support:

* Light Mode
* Dark Mode

## Navigation Structure

```text
Bottom Tabs

Home
Fuel Logs
Services
Reports
Settings
```

---

# Folder Structure

```text
src/

components/
screens/
navigation/
database/
hooks/
store/
utils/
types/
services/
constants/
```

---

# Database Schema

## Vehicles Table

```sql
id TEXT PRIMARY KEY
name TEXT
registration_number TEXT
vehicle_type TEXT
brand TEXT
model TEXT
purchase_date TEXT
current_odometer INTEGER
notes TEXT
```

## Fuel Logs Table

```sql
id TEXT PRIMARY KEY
vehicle_id TEXT
date TEXT
odometer INTEGER
fuel_amount REAL
total_cost REAL
fuel_type TEXT
notes TEXT
```

## Service Records Table

```sql
id TEXT PRIMARY KEY
vehicle_id TEXT
date TEXT
odometer INTEGER
service_type TEXT
cost REAL
notes TEXT
```

## Reminders Table

```sql
id TEXT PRIMARY KEY
vehicle_id TEXT
title TEXT
due_date TEXT
reminder_type TEXT
notes TEXT
```

---

# MVP Scope (Version 1)

Must Include:

* Vehicle Management
* Fuel Logs
* Service Records
* Reminders
* Local Notifications
* Analytics
* Dark Mode
* Backup & Restore

Must NOT Include:

* Login
* Firebase
* Cloud Sync
* User Accounts
* Social Features
* Ads

---

# Future Version 2

Potential Features

* Vehicle document storage
* Receipt image storage
* Fuel station tracking
* GPS trip history
* PDF report export
* Widgets
* Cloud backup
* Multi-device sync

---

# Play Store Listing

## App Name

Vehicle Maintenance Tracker

## Short Description

Track fuel expenses, service history, maintenance records and reminders completely offline.

## Keywords

vehicle tracker

fuel log

mileage calculator

service reminder

bike maintenance

car maintenance

maintenance tracker

insurance reminder

offline vehicle manager

fuel expense tracker

---

# Success Criteria

The application should:

* Work 100% offline
* Handle 10,000+ records smoothly
* Launch in under 2 seconds
* Never require account creation
* Allow full backup and restore
* Be ready for Play Store publication
