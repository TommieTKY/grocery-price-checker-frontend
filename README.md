# Grocery Price Checker

[Website](https://grocery-price-checker-front-end.vercel.app)

A React-based web application for comparing grocery prices across stores and categories, with interactive filtering, routing, and price‐per‐unit calculations.

---

## Features

- **Category Navigation**  
  Dynamically fetches parent/child categories from a REST API and displays them in a responsive navbar (dropdown on desktop, off‑canvas on mobile).

- **Search Bar**  
  Autocomplete search for subcategories; updates URL and content on selection.

- **Product Price Table**  
  Lists grocery items for the selected subcategory, sorted by price per unit (ascending).

- **Price Calculator**  
  Enter price & quantity (lb or kg), compute cost per unit (kg → lb conversion included), and color‑code results against an “acceptable” benchmark.

- **Deep Linking & State Hydration**  
  React Router DOM integration allows bookmarking `/:categoryName` routes; state is re‑hydrated on page reload.

- **Responsive Design**  
  Built with Bootstrap 5—navbar, grid, off‑canvas, and utility classes for a mobile‑first experience.

---

## Tech Stack

- **Framework**: React 19 + Vite
- **Routing**: react‑router‑dom v7
- **Styling**: Bootstrap 5 + custom CSS
- **API**: Fetch from [Grocery Price Checker API](https://grocery-price-checker.onrender.com)
- **State Management**: React Hooks (`useState`, `useEffect`)

---

1. **Clone the repository**

   `git clone https://github.com/TommieTKY/grocery-price-checker-frontend.git`

2. **Install dependencies**

   `npm install`

3. **Start the development server**

   `npm run dev`

---

## Usage

1. **Navigate** via the navbar or top‑right search bar to pick a subcategory.

2. **View** a sortable table of stores, prices, units, and price per unit.

3. **Calculate** your own per‑unit cost in the “Price Calculation” section—background turns green or red based on the acceptable benchmark.

4. **Mobile**: tap the hamburger icon to open the off‑canvas menu, then select a category.
