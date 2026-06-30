# Laundry Service Web App

A responsive single-page laundry service landing page built with HTML, Tailwind CSS, and vanilla JavaScript.

## Overview

This project presents a branded laundry service experience for "FreshFold" with:

- Hero section with call to action
- Services showcase
- Feature highlights
- Newsletter signup form
- Footer with contact and social links
- Cart, booking validation, and EmailJS booking email support

## Tech Stack

- HTML5
- Tailwind CSS v4
- Vanilla JavaScript
- Google Material Icons
- Ionicons
- EmailJS browser SDK

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

### 5. Set up EmailJS

Edit `resources/js/runtime-config.js` and put your EmailJS values there:

```js
window.__EMAILJS_CONFIG__ = {
  serviceId: 'your_service_id',
  templateId: 'your_template_id',
  publicKey: 'your_public_key',
};
```

The page loads `resources/js/runtime-config.js` before `app.js`, so the booking form can read the settings directly.

The booking form sends these fields to EmailJS:

- `user_name`
- `user_email`
- `user_phone`
- `service_count`
- `service_list`
- `total_amount`

If the EmailJS values are missing, the form will show a message instead of pretending the email was sent.

## Available Scripts

- `npm run build:css` - Compiles `vendors/css/input.css` into `vendors/css/output.css`
- `npm run watch:css` - Rebuilds the Tailwind CSS output whenever the input file changes

## Features

- Responsive navigation for desktop and mobile
- Service cards with add/remove cart actions
- Cart summary with total price calculation
- Booking form validation
- EmailJS booking submission
- Thank-you message after booking success
- Newsletter subscription validation
- Toast notifications for user feedback

## Notes

- The project is frontend-only; there is no backend or database configured yet.
- The current interactive behavior is handled in `resources/js/app.js`.
- If you change styles in `vendors/css/input.css`, rebuild `vendors/css/output.css` before refreshing the page.
- EmailJS settings now live in `resources/js/runtime-config.js`, so there is no `.env` or config-generation step.

## Development Notes

I built the booking flow in smaller steps so the logic is easy to follow:

1. Start with the static layout and responsive sections.
2. Add the cart with simple add and remove buttons.
3. Validate the form fields before sending any booking request.
4. Connect the booking form to EmailJS.
5. Show a visible thank-you message after the email is sent.

The JavaScript also includes short comments near the cart and booking logic so the flow is easier to study.

## Customization

You can update the branding, services, contact details, and images by editing:

- `index.html`
- `resources/js/app.js`
- `resources/img/`
- `vendors/css/input.css`
