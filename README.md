# Laundry Service Web App

A simple responsive laundry service website made with HTML, Tailwind CSS, and vanilla JavaScript.

## What This Project Does

This project shows a laundry brand called `FreshFold` and includes:

- A hero section with a main call to action
- A services section with add/remove cart buttons
- A cart summary with total price
- A booking form
- EmailJS support for sending booking details
- A newsletter form
- A footer with contact and social links

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
    runtime-config.js
vendors/
  css/
    input.css
    output.css
package.json
```

## How To Run

### 1. Install dependencies

```bash
npm install
```

### 2. Build the CSS

```bash
npm run build:css
```

### 3. Open the website

Open `index.html` in your browser.

## EmailJS Setup

The EmailJS values are stored in `resources/js/runtime-config.js`.

```js
window.__EMAILJS_CONFIG__ = {
  serviceId: "your_service_id",
  templateId: "your_template_id",
  publicKey: "your_public_key"
};
```

The booking form sends these values to EmailJS:

- `user_name`
- `user_email`
- `user_phone`
- `service_count`
- `service_list`
- `order_summary`
- `orders`
- `total_amount`
- `to_email`
- `reply_to`
- `logo_url`

The EmailJS template should use:

- `To Email`: `{{to_email}}`
- `Reply To`: `{{reply_to}}`

The logo can be shown using:

- `{{logo_url}}`

## Features

- Responsive navigation for desktop and mobile
- Service cards with add and remove buttons
- Live cart total update
- Form validation before sending booking data
- EmailJS booking message
- Newsletter validation
- Toast messages for feedback

## Challenges Faced

### 1. The cart needed to update without reloading the page

At first, the cart was hard to manage because the selected items had to stay in sync with the buttons.

How I fixed it:

- I stored the selected services in a `Map`
- I updated the button style when an item was added or removed
- I re-rendered the cart every time the selection changed

### 2. EmailJS returned a 422 error

This happened because the recipient field in the EmailJS template was empty or mismatched.

How I fixed it:

- I made the code send `to_email`
- I used `{{to_email}}` in the EmailJS template
- I also used `reply_to` so replies can go back to the user

### 3. The booking email needed to look cleaner

The first email layout was too plain and the order items were not shown in a neat way.

How I fixed it:

- I sent `orders` from JavaScript as structured data
- I changed the template to use a table for the order summary
- I added `order_summary` for simpler text fallback

### 4. The logo did not show inside the email

Local image paths do not work well in emails.

How I fixed it:

- I used a public logo URL from the hosted site
- I passed it as `logo_url` to the template


## Notes

- This project is frontend-only.
- There is no backend or database yet.
- The main interactive logic is in `resources/js/app.js`.
- If you change styles in `vendors/css/input.css`, rebuild `vendors/css/output.css`.

## Customization

You can change the branding, services, text, and images by editing:

- `index.html`
- `resources/js/app.js`
- `resources/js/runtime-config.js`
- `resources/img/`
- `vendors/css/input.css`
