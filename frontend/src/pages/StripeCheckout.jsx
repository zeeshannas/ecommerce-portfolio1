import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import API from "../services/api";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51T4aScRZ73IOccvIb7UjncKI9XkWkGYGIEsOJZI1bpQGYh9dQkxdKPIvZ6BBleRsbiYIRcCfeOWRw6OQ8roLUvNM00qOGSb8eM"
);

function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!amount || Number(amount) <= 0) return;
    API.post("/create-payment-intent", { amount: Number(amount) })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => {
        console.error("Payment intent error", err.response || err);
        toast.error("Unable to start payment, try again.");
      });
  }, [amount]);

  const finalizeOrder = async (paymentIntentId) => {
    try {
      await API.post("/confirm-payment", { paymentIntentId });
      toast.success("Payment successful!");
      navigate("/order-success");
    } catch (err) {
      console.error("Confirm payment error", err.response || err);
      toast.error("Payment processed, but we could not update your order.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
    if (processing) return;

    setProcessing(true);
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        // If Stripe says intent already succeeded, just finalize order
        if (
          error.code === "payment_intent_unexpected_state" &&
          error.payment_intent?.status === "succeeded"
        ) {
          await finalizeOrder(error.payment_intent.id);
        } else {
          toast.error(error.message || "Payment failed.");
        }
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        await finalizeOrder(paymentIntent.id);
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border border-slate-200 rounded-lg p-3 bg-white">
        <CardElement />
      </div>
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="w-full py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {processing ? "Processing..." : `Pay $${Number(amount).toFixed(2)}`}
      </button>
    </form>
  );
}

export default function StripeCheckout({ amount }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
}