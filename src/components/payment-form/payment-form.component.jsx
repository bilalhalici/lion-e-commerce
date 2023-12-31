import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import  { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import {
  PaymentFormContainer,
  FormContainer,
  ButtonContainer,
  PaymentButton,
} from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const PaymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser.displayName || "Guest",
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment successful!");
      }
    }
  };
  // cartElement without zipCode
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={PaymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                  backgroundColor: "#fff",
                  padding: "10px",
                },
                ":focus": {
                  color: "#424770",
                  backgroundColor: "#fff",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <ButtonContainer>
          <PaymentButton
            buttonType={BUTTON_TYPE_CLASSES.inverted}
            isLoading={isProcessingPayment}
          >
            Pay Now
          </PaymentButton>
        </ButtonContainer>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
