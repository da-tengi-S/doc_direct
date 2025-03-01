import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post("http://localhost:4000/api/payment/create-payment-intent", {
                amount: 50, // Replace with dynamic amount
                currency: "usd",
            });

            const clientSecret = data.clientSecret;
            const paymentMethod = {
                card: elements.getElement(CardElement),
            };

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod,
            });

            if (error) {
                setMessage(error.message);
            } else if (paymentIntent.status === "succeeded") {
                setMessage("Payment successful!");
            }
        } catch (error) {
            setMessage("Payment failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                {loading ? "Processing..." : "Pay Now"}
            </button>
            {message && <p>{message}</p>}
        </form>
    );
};

const StripeCheckout = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default StripeCheckout;
