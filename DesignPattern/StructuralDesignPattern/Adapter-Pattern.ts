interface PaymentProcessor {
  pay(amount: number): void;
}

class PayPal {
  sendPayment(amount: number) {
    console.log(`PayPal processed payment of $${amount}`);
  }
}

class Stripe {
  sendPayment(amount: number) {
    console.log(`Stripe processed payment of $${amount}`);
  }
}

class Razorpay {
  transfer(amount: number) {
    console.log(`Razorpay processed payment of $${amount}`);
  }
}

class PayPalPaymentAdapter implements PaymentProcessor {
  constructor(private paypal: PayPal) {}
  pay(amount: number): void {
    this.paypal.sendPayment(amount);
  }
}

class stripPaymentAdapter implements PaymentProcessor {
  constructor(private strip: Stripe) {}
  pay(amount: number): void {
    this.strip.sendPayment(amount);
  }
}

class RazorPaymentAdapter implements PaymentProcessor {
  constructor(private razorPay: Razorpay) {}
  pay(amount: number): void {
    this.razorPay.transfer(amount);
  }
}

class PaymentGatewayRegistry {
  private gateWay: Map<string, PaymentProcessor> = new Map();

  register(name: string, processor: PaymentProcessor) {
    this.gateWay.set(name.toLowerCase(), processor);
    console.log(`Gateway "${name}" registered`);
  }

  getProcessor(name: string): PaymentProcessor {
    const processor = this.gateWay.get(name.toLowerCase());
    if (!processor) throw new Error(`Gateway "${name}" not found`);
    return processor;
  }

  listGateways() {
    console.log("Available gateways:", [...this.gateWay.keys()].join(", "));
  }
}

const paypalAdapter = new PayPalPaymentAdapter(new PayPal());
const stripeAdapter = new stripPaymentAdapter(new Stripe());
const razorpayAdapter = new RazorPaymentAdapter(new Razorpay());

const registry = new PaymentGatewayRegistry();
registry.register("PayPal", paypalAdapter);
registry.register("Stripe", stripeAdapter);
registry.register("Razorpay", razorpayAdapter);

registry.listGateways();

function checkout(gatewayName: string, amount: number) {
  const processor = registry.getProcessor(gatewayName);
  processor.pay(amount);
}

checkout("PayPal", 100);
checkout("Stripe", 200);
checkout("Razorpay", 300);