# Klink — Nordic Folkboat Companion

<div align="center">

```
▓   ▓ ▓     ▓▓▓ ▓   ▓ ▓   ▓   
▓░ ▓ ░▓░     ▓░░▓▓  ▓░▓░ ▓ ░  
▓▓▓ ░ ▓░░    ▓░░▓░▓ ▓░▓▓▓ ░ ░ 
▓░░▓ ░▓░░    ▓░░▓░░▓▓░▓░░▓ ░  
▓░░░▓ ▓▓▓▓▓ ▓▓▓░▓░░ ▓░▓░░░▓   
 ░░  ░ ░░░░░ ░░░ ░░  ░░░░  ░  
  ░   ░ ░░░░░ ░░░ ░   ░ ░   ░ 
```

**A purpose-built digital companion and vessel logbook for Nordic Folkboat (*Nordisk Folkbåt*) owners, skippers, and restorers.**

[![React 19](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5%2F7-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)](https://vite.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Bilingual](https://img.shields.io/badge/i18n-English%20%7C%20Svenska-006994?style=flat-square)](#-bilingual-support-en--sv)
[![Offline First](https://img.shields.io/badge/Storage-LocalFirst%20Offline-28a99e?style=flat-square)](#-offline-first-storage)

</div>

---

## 🌊 Overview

The **Nordic Folkboat** (*Nordisk Folkbåt*), designed in Scandinavia in 1942, is one of the most enduring, seaworthy, and beloved classic sailing keelboats in the world. Whether constructed in traditional clinker lapstrake wood (larch on oak) or modern Nordic GRP (fibreglass), owning and campaigning a Folkboat requires dedicated seasonal care, precise rig measurements, and thorough maintenance tracking.

**Klink** is designed from the keel up specifically for Folkboat sailors. Named after the classic Scandinavian overlapping hull planking technique (*klinkbyggd* / clinker lapstrake), Klink replaces scattered paper notebooks, disjointed notes apps, and spreadsheets with an intuitive, mobile-first maritime companion that works completely offline.

---

## ✨ Features

### 📅 Seasonal To-Do Management
Folkboat maintenance naturally revolves around the Baltic and North Sea seasonal calendar:
- **Spring (*Vårrustning*)**: Hull scraping, oiling/varnishing, antifouling, stepping the mast, rig tensioning, safety gear inspection.
- **Summer (*Segling*)**: Racing tuning, weekend cruising preparation, halyard replacements, provisioning.
- **Autumn (*Upptagning*)**: Haul-out, pressure washing, engine winterization, spar unstepping, protective tarping.
- **Winter (*Vintervila / Snickeriarbeten*)**: Off-season woodshop projects, tiller refinishing, hatch building, block rebuilding.
- **Interactive Controls**: Drag-and-drop reordering, priority flags (`!`), ISO date reminders, batch clear completed, and instant seasonal filtering.

### 🛒 Chandlery & To-Buy Shopping Checklist
- Keep track of supplies, marine hardware, fasteners, caulking, and paint needed at the boatyard or marine store.
- Specify exact quantities and sizes (e.g., *"2 tubes Sikaflex 291i"*, *"1L Epifanes Clear Gloss"*, *"Bronze wood screws 4.5×40mm"*).
- Instant checkbox toggles, high-priority star indicators, drag reordering, and one-click removal of purchased items.

### ⛵ "My Boat" Vessel Logbook & Specifications
A unified digital binder for your Folkboat's technical data:
- **Measurements**: Critical rig and sail dimensions (forestay, backstay, upper/lower shrouds, spinnaker pole, mainsail luff/foot, jib dimensions, masthead to deck clearance).
- **Maintenance Log**: Categorized historical maintenance records covering Rigging, Hull, Deck, Engine/Outboard, Electrical, and Interior.
- **Voyage & Travel Log**: Record passages, nautical miles logged, routes, sea conditions, wind force, and skipper notes.
- **Misc Specifications**: Outboard motor model and serial number, paint/varnish color formulas, winter cradle dimensions, and insurance policy details.

### 📚 Curated Folkboat Resources Directory
Direct links to official class rules, regional Folkboat associations, and essential technical guides:
- *Nordic Folkboat International Association (NFIA)*
- *Svenska Folkbåtförbundet* (Sweden)
- *Dansk Folkebådsklub* (Denmark)
- *Deutsche Folkeboot-Vereinigung* (Germany)
- *UK Folkboat Association* & *U.S. Folkboat Association (San Francisco Bay)*
- Class rules, wooden boat maintenance guides, and classic clinker care tutorials.
- Easily add your own custom bookmarks.

### 🌐 Bilingual Support (EN / SV)
- Full bilingual localization in **English** and **Svenska (Swedish)**.
- Localized maritime terminology (e.g., *klinkbyggd*, *vårrustning*, *fall*, *stag*, *vant*, *fribord*).
- Pre-loaded with authentic Swedish Folkboat seed records for Swedish skippers.

### 📲 Crew Sharing & Text Export
- Generate clean, formatted plain-text summaries of tasks, shopping lists, measurements, or log entries.
- One-click copy to clipboard or `.txt` file download to quickly text or email crew before a work weekend or voyage.

### 💾 Offline-First Storage
- Zero required accounts, zero remote server dependency.
- All boat records, todos, logs, and preferences persist in browser `localStorage`.
- Works reliably on the dock, in remote anchorages, or inside a boat shed with no cellular signal.

---

## 🎨 Design Philosophy & Aesthetic

Klink features a clean, functional Nordic aesthetic inspired by maritime ergonomics:
- **Palette**: Deep Baltic ocean blue (`#006994`), seafoam accent green (`#28A99E`), yacht varnish royal gold (`#F2D66A`), and light sail-canvas backgrounds (`#E9EBE9`).
- **Typography**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) for legible UI controls paired with [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) for tabular measurements, sail numbers, and nautical distances.
- **Custom Iconography**: Custom clinker lapstrake bow emblems, seasonal flower/sun/leaf/snowflake indicators, and tactile checkbox controls.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG maritime graphics
- **Animations**: [Motion](https://motion.dev/)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- `npm` (version 9 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/klink.git
   cd klink
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   > **Note for Windows Users:** If PowerShell blocks script execution (`UnauthorizedAccess`), run `npm.cmd run dev` or run PowerShell with `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`.

4. **Open in browser:**
   Open [http://localhost:3000](http://localhost:3000) to view Klink in your browser.

---

## 📋 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches the Vite dev server on port `3000` with host `0.0.0.0` |
| `npm run build` | Builds the production bundle into the `dist/` directory |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs TypeScript typechecking (`tsc --noEmit`) |
| `npm run clean` | Cleans up the `dist/` build directory |

---

## 📂 Project Structure

```text
Klink/
├── public/                     # Static assets and icons
├── src/
│   ├── components/             # Modular UI components
│   │   ├── KlinkIcons.tsx      # Custom SVG clinker boat emblem & season icons
│   │   ├── Modals.tsx          # Quick Add, Vessel Profile & Share/Export modals
│   │   ├── MyBoatSection.tsx   # Measurements, Maintenance, Travel, Misc views
│   │   ├── ResourcesView.tsx   # Folkboat community links & documentation
│   │   ├── TaskOptionsMenu.tsx # Priority, season, reminder, & delete popover
│   │   ├── ToBuyListView.tsx   # Chandlery shopping list with quantities
│   │   └── TodoListView.tsx    # Maintenance task list with seasonal filters
│   ├── data/
│   │   └── initialData.ts      # Demo dataset for S/Y Freja (SWE 412)
│   ├── App.tsx                 # Root application state, routing, and storage
│   ├── i18n.ts                 # English & Swedish translation dictionaries
│   ├── index.css               # Tailwind CSS v4 setup and custom theme variables
│   ├── main.tsx                # Application entry point
│   └── types.ts                # TypeScript interfaces and domain models
├── .env.example                # Example environment variables template
├── metadata.json               # Application metadata and capabilities
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration with Tailwind CSS plugin
```

---

## 🧭 Data Model & Storage

All application state is saved under the localStorage key:
```typescript
const STORAGE_KEY = 'klink_folkboat_app_v1';
```

Stored data includes:
- **`todos`**: Maintenance tasks with title, completion state, priority, seasonal tag, and reminder date.
- **`toBuy`**: Chandlery items with title, quantity, priority, and completion status.
- **`measurements`**: Boat dimensions, rigging lengths, and notes.
- **`maintenance`**: Historical maintenance log entries with date and category.
- **`travel`**: Logbook entries with date, passage route, distance in nautical miles (NM), and weather conditions.
- **`misc`**: General equipment specs (engine, battery, paint codes).
- **`resources`**: Bookmark list of Folkboat websites, associations, and guides.
- **`boatProfile`**: Vessel name, sail number (e.g. `SWE 412`), hull construction (`Clinker Wood` or `Nordic GRP`), build year, home port, and owner.
- **`language`**: Active UI language (`'en'` or `'sv'`).
- **`layoutMode`**: Display mode (`'grid'` or `'list'`).
- **`sortMode`**: Task sorting order (`'custom'`, `'alpha'`, `'priority'`, or `'season'`).

Demo data can be reset at any time via the **Vessel Profile modal** (`Restore Demo Data`).

---

## 🤝 Contributing

Contributions to improve Klink are warmly welcomed! Folkboat skippers, wooden boat craftspeople, and developers are invited to submit suggestions:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add amazing feature'`)
4. Verify TypeScript compilation (`npm run lint`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with respect for the classic Nordic Folkboat and the craftspeople who keep them sailing. ⛵</sub>
</div>
