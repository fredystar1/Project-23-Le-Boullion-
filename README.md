# Howard Street Wine Merchant 🍷

**Status:** 🚧 Under Construction  
**Stack:** Next.js + TypeScript + Tailwind CSS

---

## Overview

Howard Street Wine Merchant is Omaha's premier wine vendor. Their new web experience is currently in development. Our project is to create an updated, fully functional website for the company Howard Street Wine Merchant. The website will be functionally editable by non-technical users, and will also include a wine quiz to drive sale performance. 

This repository contains the Next.js application powering the website. The project is being built with performance, scalability, and clean design in mind.

---

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Storyblok CMS** (headless content management)
- **Toast POS API** (inventory integration)
- **TypeDoc** (API documentation generation)
- **ESLint**

## Development

### 1. Clone the repository

```bash
git clone https://github.com/fredystar1/Project-23-Le-Boullion-.git
cd Project-23-Le-Boullion-/hswm
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Local Environment

Create a `.env.local` file at the `hswm/` project root with the following keys:

```env
STORYBLOK_API_TOKEN=<your-storyblok-access-token>
TOAST_HOSTNAME=<toast-api-base-url>
TOAST_CLIENT_ID=<toast-client-id>
TOAST_CLIENT_SECRET=<toast-client-secret>
TOAST_RESTAURANT_GUID=<toast-restaurant-guid>
```

> **Note:** The Storyblok token is required for the site to function. The Toast keys are only needed if you want the `/toast-test` diagnostic page to work.

### 4. Run Development Server

```bash
npm run dev
```

---

## API Documentation

The entire codebase is annotated with [TypeDoc](https://typedoc.org/)-compatible JSDoc comments. You can generate a browsable HTML documentation site from the source.

### Prerequisites

All documentation dependencies are installed automatically when you run `npm install` (TypeDoc is listed in `devDependencies`).

### Generate Documentation

```bash
npm run docs
```

This outputs static HTML files to the `docs/` directory.

### View the Documentation

**Option A** — Open the HTML file directly:

```bash
# Windows
start docs\index.html

# macOS / Linux
open docs/index.html
```

**Option B** — Build and serve locally with a single command:

```bash
npm run docs:serve
```

This regenerates the docs and starts a local web server (typically at `http://localhost:3000`).

### Documentation Configuration

| File | Purpose |
|------|---------|
| `typedoc.json` | TypeDoc settings — entry points, output dir, project name |
| `tsconfig.typedoc.json` | TypeScript config override for TypeDoc (swaps `moduleResolution` from `bundler` → `node`) |

### What's Documented

Every TypeScript / TSX source file contains JSDoc annotations covering:

- **Module-level descriptions** — what the file does and how it fits into the architecture
- **Interfaces & types** — per-field documentation for all props, data types, and API shapes
- **Functions & components** — `@param`, `@returns`, `@example`, and `@remarks` tags
- **Cross-references** — `{@link}` tags connecting related modules and types







