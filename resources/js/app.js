const serviceButtons = document.querySelectorAll('#services .btn-add');
const emptyCart = document.getElementById('emptyCart');
const cartItems = document.getElementById('cartItems');
const cartBody = cartItems ? cartItems.querySelector('tbody') : null;
const cartTotal = document.getElementById('cartTotal');
const bookingForm = document.getElementById('bookingForm');
const bookingName = document.getElementById('name');
const bookingEmail = document.getElementById('email');
const bookingPhone = document.getElementById('phone');
const toast = document.getElementById('toast');

const newsletterName = document.getElementById('newsletterName');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterSubscribe = document.getElementById('newsletterSubscribe');

const selectedServices = new Map();
let toastTimer;

function escapeHtml(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function formatPrice(value) {
    return `₹${value.toFixed(2)}`;
}

function setServiceButtonState(button, isSelected) {
    const baseClasses = [
        'inline-flex',
        'items-center',
        'gap-2',
        'rounded-full',
        'px-4',
        'py-2',
        'text-sm',
        'font-semibold',
        'text-white',
        'transition',
    ];
    const activeClasses = isSelected
        ? ['bg-rose-600', 'hover:bg-rose-700']
        : ['bg-slate-900', 'hover:bg-slate-800'];

    button.className = [...baseClasses, ...activeClasses].join(' ');
    button.innerHTML = isSelected
        ? '<strong>Remove Item</strong> <ion-icon name="remove-circle-outline"></ion-icon>'
        : '<strong>Add Item</strong> <ion-icon name="add-circle-outline"></ion-icon>';
}

function showToast(message, variant = 'dark') {
    if (!toast) return;

    toast.className = 'pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full px-5 py-3 text-sm font-medium shadow-lg transition-opacity duration-300';
    toast.classList.add(variant === 'success' ? 'bg-emerald-600' : 'bg-slate-950', 'text-white');
    toast.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100');

    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
        toast.classList.add('opacity-0');
        window.setTimeout(() => {
            toast.classList.add('hidden');
        }, 200);
    }, 2200);
}

function updateCart() {
    if (!emptyCart || !cartItems || !cartBody || !cartTotal) return;

    const items = [...selectedServices.values()];

    if (items.length === 0) {
        emptyCart.classList.remove('hidden');
        cartItems.classList.add('hidden');
        cartBody.innerHTML = '';
        cartTotal.textContent = formatPrice(0);
        return;
    }

    emptyCart.classList.add('hidden');
    cartItems.classList.remove('hidden');

    const total = items.reduce((sum, item) => sum + item.price, 0);

    cartBody.innerHTML = items
        .map((item, index) => `
            <tr class="border-t border-slate-100">
                <td class="px-4 py-3 text-slate-500">${index + 1}</td>
                <td class="px-4 py-3 font-medium text-slate-900">${escapeHtml(item.name)}</td>
                <td class="px-4 py-3 text-right font-semibold text-slate-900">${formatPrice(item.price)}</td>
            </tr>
        `)
        .join('');

    cartTotal.textContent = formatPrice(total);
}

serviceButtons.forEach((button) => {
    setServiceButtonState(button, false);

    button.addEventListener('click', () => {
        const card = button.closest('article');
        const serviceNameEl = card ? card.querySelector('.service-name') : null;
        const servicePriceEl = card ? card.querySelector('.service-price') : null;

        if (!serviceNameEl || !servicePriceEl) return;

        const name = serviceNameEl.textContent.trim();
        const price = Number.parseFloat(servicePriceEl.textContent.replace(/[^\d.]/g, '')) || 0;

        if (selectedServices.has(card)) {
            selectedServices.delete(card);
            setServiceButtonState(button, false);
            updateCart();
            showToast(`${name} removed from cart`);
            return;
        }

        selectedServices.set(card, { name, price, button });
        setServiceButtonState(button, true);
        updateCart();
        showToast(`${name} added to cart`, 'success');
    });
});

function resetCartSelections() {
    selectedServices.forEach((item) => {
        setServiceButtonState(item.button, false);
    });
    selectedServices.clear();
    updateCart();
}

if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = bookingName ? bookingName.value.trim() : '';
        const email = bookingEmail ? bookingEmail.value.trim() : '';
        const phone = bookingPhone ? bookingPhone.value.trim() : '';

        if (selectedServices.size === 0) {
            showToast('Add at least one service to the cart first');
            return;
        }

        if (!name || !email || !phone) {
            showToast('Fill in your name, email, and phone number');
            return;
        }

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailValid) {
            showToast('Enter a valid email address');
            bookingEmail?.focus();
            return;
        }

        const phoneValid = /^[0-9]{10}$/.test(phone);
        if (!phoneValid) {
            showToast('Enter a valid 10 digit phone number');
            bookingPhone?.focus();
            return;
        }

        showToast(`Booking confirmed for ${selectedServices.size} service${selectedServices.size > 1 ? 's' : ''}.`, 'success');
        bookingForm.reset();
        resetCartSelections();
    });
}

if (newsletterSubscribe) {
    newsletterSubscribe.addEventListener('click', () => {
        const name = newsletterName ? newsletterName.value.trim() : '';
        const email = newsletterEmail ? newsletterEmail.value.trim() : '';

        if (!name || !email) {
            showToast('Enter your name and email', 'dark');
            return;
        }

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailValid) {
            showToast('Enter a valid email address', 'dark');
            newsletterEmail?.focus();
            return;
        }

        showToast(`Thanks ${name}, you subscribed.`, 'success');

        if (newsletterName) newsletterName.value = '';
        if (newsletterEmail) newsletterEmail.value = '';
    });
}

updateCart();
