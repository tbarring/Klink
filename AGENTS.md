# AGENTS.md — Agent Guidelines for Klink

Welcome, AI Coding Agent! This document outlines the architectural patterns, technology stack, conventions, workflows, and domain context for contributing to the **Klink — Nordic Folkboat Companion** codebase.

---

## ⛵ Repository Context & Purpose

- **Project Name**: Klink (Nordic Folkboat Companion)
- **Domain**: Marine software designed specifically for owners, skippers, and restorers of classic **Nordic Folkboats** (*Nordisk Folkbåt*), both clinker-built wooden hulls and GRP/fibreglass hulls.
- **Core Philosophy**: Fast, responsive, offline-first mobile and desktop web companion. No backend server dependency; all state is persisted locally.

---

## 🛠️ Environment & Tooling (Windows Notes)

This repository operates on a Windows host environment with PowerShell.

> [!WARNING]
> **PowerShell Script Execution Policy**:
> Direct execution of `npm` or `npx` may fail with `PSSecurityException` because `.ps1` execution is restricted.
> **Always invoke npm commands using `npm.cmd`** (or `npx.cmd`):
> ```powershell
> npm.cmd run dev
> npm.cmd run lint
> npm.cmd run build
> ```

### Common Commands

| Command | Action |
| :--- | :--- |
| `npm.cmd install` | Install all npm dependencies |
| `npm.cmd run dev` | Run Vite development server (`http://localhost:3000`, host `0.0.0.0`) |
| `npm.cmd run lint` | Typecheck codebase (`tsc --noEmit`) |
| `npm.cmd run build` | Compile production build into `dist/` |
| `npm.cmd run preview`| Preview the production build locally |
| `npm.cmd run clean` | Remove `dist/` build artifacts |

---

## 🏗️ Architecture & State Management

### 1. Single-Page State Hub
- The single source of truth resides in [`src/App.tsx`](file:///src/App.tsx).
- Subcomponents in [`src/components/`](file:///src/components/) are largely controlled presentation components receiving data and callback handlers via props.
- Subcomponents should remain pure where possible; avoid duplicating state in child components unless managing transient UI state (e.g., local form inputs, open/closed popovers).

### 2. Offline-First LocalStorage Persistence
- State is serialized into `localStorage` under the key:
  ```typescript
  const STORAGE_KEY = 'klink_folkboat_app_v1';
  ```
- Any modification to state interfaces in [`src/types.ts`](file:///src/types.ts) must be backwards-compatible with stored JSON:
  - Provide fallback defaults when hydrating from `localStorage` in `loadInitialState()`.
  - Always guard with `try / catch` around `localStorage.getItem` and `localStorage.setItem`.

### 3. Optimistic Updates & Undo Toasts
- User actions (adding, deleting, toggling tasks, clearing lists) update state optimistically.
- Destructive actions (deleting an item, clearing completed items) should display an undo toast using `showToast(message, undoCallback)`.

---

## 🌐 Internationalization (i18n) Rules

Klink is **strictly bilingual** (English `en` and Swedish `sv`).

1. **No Hardcoded Strings in UI**:
   - All user-facing strings must be defined in [`src/i18n.ts`](file:///src/i18n.ts) inside `TRANSLATIONS.en` and `TRANSLATIONS.sv`.
   - Access strings using the active language dictionary: `const t = TRANSLATIONS[lang]`.

2. **Seed Data Translation Mappings**:
   - The initial demo data in [`src/data/initialData.ts`](file:///src/data/initialData.ts) is written in English.
   - Swedish localized seed texts are mapped via lookup tables in [`src/i18n.ts`](file:///src/i18n.ts):
     - `SV_SEED_TODOS`
     - `SV_SEED_TOBUY`
     - `SV_SEED_MEASUREMENTS`
     - `SV_SEED_MAINTENANCE`
     - `SV_SEED_TRAVEL`
     - `SV_SEED_MISC`
   - If adding or modifying initial seed data items, ensure both the base entry in `initialData.ts` and the Swedish counterpart in `i18n.ts` are updated.

---

## 🎨 Styling & Design Tokens (Tailwind CSS v4)

Klink uses **Tailwind CSS v4** via `@tailwindcss/vite`. There is no `tailwind.config.js`.

### Maritime Color Palette
Defined as CSS variables in [`src/index.css`](file:///src/index.css):

| Token / Variable | Hex | Usage |
| :--- | :--- | :--- |
| `--klink-ocean` | `#006994` | Primary brand blue, CTA buttons, active tabs, header pills |
| `--klink-sea-green` | `#28a99e` | Secondary ocean teal, waves, emblems, subtle borders |
| `--klink-royal-gold` | `#f2d66a` | Accent gold, vessel profile border, warning tags |
| `--klink-saddle-brown` | `#8c522a` | Wood / varnish accents |
| `--klink-golden-earth` | `#996515` | Warm wood accents |
| `--klink-canvas` | `#e9ebe9` | Page canvas background |
| `--klink-surface` | `#ffffff` | Content cards, modals, sheets |
| `--klink-ink` | `#111413` | Primary body and heading typography |
| `--klink-ink-muted` | `#525855` | Secondary text, captions, metadata |

### Typography
- **UI & Headers**: `"Plus Jakarta Sans", sans-serif`
- **Tabular & Technical Specs**: `"JetBrains Mono", monospace` (`font-mono-tabular`)
  - Use `font-mono-tabular` for: dimensions, sail numbers (e.g. `SWE 412`), dates, nautical miles, and quantities.

### Component Details
- Custom checkboxes use `.klink-checkbox` with crisp SVG clip-paths.
- Interactive buttons should include active press states (e.g. `active:scale-[0.98]`).
- Minimum touch target size on mobile: **44px × 44px**.

---

## ⚓ Folkboat Maritime Domain Reference

When adding features, writing copy, or adjusting models, respect accurate Nordic Folkboat terminology:

- **Boat Class**: Nordic Folkboat / *Nordisk Folkbåt* (designed 1942).
- **Hull Types**:
  - `Clinker Wood (Larch/Oak)` (*Klinkbyggd trä*)
  - `Nordic GRP (Fibreglass)` (*Nordisk plast/glasfiber*)
- **Sail Numbers**: Prefix by nation code (e.g. `SWE 412`, `DEN 800`, `GER 1200`, `GBR 700`, `USA 100`).
- **Seasons**:
  - `spring` — Fitting out / *Vårrustning* (hull painting, antifouling, stepping mast)
  - `summer` — Sailing season / *Segling* (cruising, racing, regattas)
  - `autumn` — Haul-out / *Upptagning* (unstepping mast, winterizing engine, tarping)
  - `winter` — Off-season / *Vintervila / Snickeriarbeten* (woodshop repairs, varnishing)
- **Units**: Distances in nautical miles (`NM`), measurements in meters or millimeters.

---

## 📁 Key File Locations

| File | Purpose |
| :--- | :--- |
| [`src/types.ts`](file:///src/types.ts) | Domain interfaces (`TodoItem`, `ToBuyItem`, `MeasurementItem`, `BoatProfile`, etc.) |
| [`src/App.tsx`](file:///src/App.tsx) | Root component, application state, routing, persistence, export builder |
| [`src/i18n.ts`](file:///src/i18n.ts) | Translation dictionaries (`en`, `sv`) and localized seed data |
| [`src/data/initialData.ts`](file:///src/data/initialData.ts) | Realistic default demo records for S/Y Freja |
| [`src/components/KlinkIcons.tsx`](file:///src/components/KlinkIcons.tsx) | Custom SVG icons (lapstrake emblem, seasonal flower/sun/leaf/snow) |
| [`src/components/TodoListView.tsx`](file:///src/components/TodoListView.tsx) | To-do view, seasonal filter, sorting, drag reorder |
| [`src/components/ToBuyListView.tsx`](file:///src/components/ToBuyListView.tsx) | Chandlery shopping list with quantities |
| [`src/components/MyBoatSection.tsx`](file:///src/components/MyBoatSection.tsx) | Measurements, Maintenance Log, Travel/Voyage Log, Misc tabs |
| [`src/components/ResourcesView.tsx`](file:///src/components/ResourcesView.tsx) | Community associations, class rules, and guide links |
| [`src/components/Modals.tsx`](file:///src/components/Modals.tsx) | Quick Add, Vessel Profile, and Share/Export modals |
| [`src/components/TaskOptionsMenu.tsx`](file:///src/components/TaskOptionsMenu.tsx) | Contextual task option popover (priority, season, reminder, delete) |

---

## 🤖 Pre-Flight Verification Checklist for Agents

Before concluding any code changes, automated agents must perform these checks:

1. **Type Safety**:
   ```powershell
   npm.cmd run lint
   ```
   Must pass with **0 errors**. Never introduce `any` where a strict type from `src/types.ts` is appropriate.

2. **Production Build**:
   ```powershell
   npm.cmd run build
   ```
   Must succeed cleanly without unresolved imports or broken bundle errors.

3. **Bilingual Completeness**:
   If you add a user-visible string, verify it exists in both `TRANSLATIONS.en` and `TRANSLATIONS.sv` in [`src/i18n.ts`](file:///src/i18n.ts).

4. **Responsive Layout Check**:
   Ensure modifications render correctly on narrow mobile viewports (~375px) without horizontal clipping or scrollbar breakage, and scale gracefully to desktop (~1280px).

5. **Accessibility**:
   Ensure all icon-only buttons have an `aria-label` attribute and interactive elements are keyboard focusable.
