import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe publishable key
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51RuWpwDQLfeG3uzwgwFbglhzwLFWzreZAYgkWFAUBDrwjrZPLzPhtCyXykAHKmNVBSlVgBWXT95fI8FimpZedEyD00TQ7GXrbk';

export const stripePromise = loadStripe(stripePublishableKey); 