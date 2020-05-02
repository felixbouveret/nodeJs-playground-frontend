<template>
  <div class="payment-container">
    {{ client_secret }}
    <Button @click="checkout" text="checkout" />
    <form
      v-if="initialized"
      class="credit-card-inputs"
      :class="{ complete }"
      @submit.prevent="pay"
    >
      <card-number
        class="stripe-element card-number"
        ref="cardNumber"
        :stripe="stripeKey"
        @change="number = $event.complete"
      />
      <card-expiry
        class="stripe-element card-expiry"
        ref="cardExpiry"
        :stripe="stripeKey"
        @change="expiry = $event.complete"
      />
      <card-cvc
        class="stripe-element card-cvc"
        ref="cardCvc"
        :stripe="stripeKey"
        @change="cvc = $event.complete"
      />
      <Button type="submit" text="Pay" />
    </form>
  </div>
</template>

<script>
import Button from "~/components/commons/Button";
import {
  CardNumber,
  CardExpiry,
  CardCvc,
  instance
} from "vue-stripe-elements-plus";
export default {
  components: {
    Button,
    CardNumber,
    CardExpiry,
    CardCvc
  },
  data() {
    return {
      stripeKey: "pk_test_YMDihBdrnXEY5g0qRQdT8cBg00SktDVbZS",
      initialized: false,
      client_secret: null,
      complete: false,
      number: false,
      expiry: false,
      cvc: false
    };
  },
  mounted() {
    this.initialized = true;
  },
  methods: {
    checkout() {
      this.$axios
        .$get("/payment/")
        .then(res => {
          this.client_secret = res.client_secret;
        })
        .catch();
    },
    update() {
      this.complete = this.number && this.expiry && this.cvc;

      if (this.number) {
        if (!this.expiry) {
          this.$refs.cardExpiry.focus();
        } else if (!this.cvc) {
          this.$refs.cardCvc.focus();
        }
      } else if (this.expiry) {
        if (!this.cvc) {
          this.$refs.cardCvc.focus();
        } else if (!this.number) {
          this.$refs.cardNumber.focus();
        }
      }
    },
    pay() {
      let se = this.$refs.cardNumber.$refs.element;
      instance
        .confirmCardPayment(this.client_secret, {
          payment_method: {
            card: se._element,
            billing_details: {
              name: "Jenny Rosen"
            }
          }
        })
        .then(function(result) {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === "succeeded") {
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
            }
          }
        });
    }
  },
  watch: {
    number() {
      this.update();
    },
    expiry() {
      this.update();
    },
    cvc() {
      this.update();
    }
  }
};
</script>

<style></style>
