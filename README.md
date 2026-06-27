# Laundry Service Web App

A responsive single-page laundry service landing page built with HTML, Tailwind CSS, and vanilla JavaScript.

## Overview

This project presents a branded laundry service experience for "FreshFold" with:

- Hero section with call to action
- Services showcase
- Feature highlights
- Newsletter signup form
- Footer with contact and social links
- Basic cart and booking interactions powered by JavaScript

## Tech Stack

- HTML5
- Tailwind CSS v4
- Vanilla JavaScript
- Google Material Icons
- Ionicons

## Project Structure

```text
index.html
resources/
  css/
    style.css
    responsive.css
  img/
  js/
    app.js
vendors/
  css/
    input.css
    output.css
package.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Build the CSS

```bash
npm run build:css
```

### 3. Watch CSS during development

```bash
npm run watch:css
```

### 4. Open the app

Open `index.html` in your browser.

## Available Scripts

- `npm run build:css` - Compiles `vendors/css/input.css` into `vendors/css/output.css`
- `npm run watch:css` - Rebuilds the Tailwind CSS output whenever the input file changes

## Features

- Responsive navigation for desktop and mobile
- Service cards with add/remove cart actions
- Cart summary with total price calculation
- Booking form validation
- Newsletter subscription validation
- Toast notifications for user feedback

## Notes

- The project is frontend-only; there is no backend or database configured yet.
- The current interactive behavior is handled in `resources/js/app.js`.
- If you change styles in `vendors/css/input.css`, rebuild `vendors/css/output.css` before refreshing the page.

## Customization

You can update the branding, services, contact details, and images by editing:

- `index.html`
- `resources/js/app.js`
- `resources/img/`
- `vendors/css/input.css`

