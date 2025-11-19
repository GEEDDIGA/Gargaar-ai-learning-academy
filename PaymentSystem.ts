// Payment System for Gargaar AI Learning Academy
// Handles payment processing and subscription management

export interface PaymentPlan {
  id: string;
  name: string;
  price: number; // USD
  currency: string;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
}

export const PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: 9.99,
    currency: 'USD',
    billingPeriod: 'monthly',
    features: ['Unlimited course access', 'All AI levels', 'Certificate of completion'],
  },
  {
    id: 'yearly',
    name: 'Yearly Plan',
    price: 89.99,
    currency: 'USD',
    billingPeriod: 'yearly',
    features: ['Unlimited course access', 'All AI levels', 'Certificate of completion', 'Priority support'],
  },
];

export interface PaymentTransaction {
  transactionId: string;
  userId: string;
  planId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
  paymentMethod: 'stripe' | 'paypal' | 'card';
}

export const PaymentSystem = {
  // Get payment plan by ID
  getPlan(planId: string): PaymentPlan | undefined {
    return PAYMENT_PLANS.find(plan => plan.id === planId);
  },

  // Process payment (integrate with Stripe/PayPal)
  async processPayment(userId: string, planId: string, paymentMethod: string): Promise<PaymentTransaction> {
    const plan = this.getPlan(planId);
    if (!plan) throw new Error('Invalid payment plan');

    const transaction: PaymentTransaction = {
      transactionId: `TXN_${Date.now()}_${userId}`,
      userId,
      planId,
      amount: plan.price,
      currency: plan.currency,
      status: 'pending',
      timestamp: Date.now(),
      paymentMethod: paymentMethod as any,
    };

    // TODO: Integrate with Stripe or PayPal API
    // For now, mark as completed (in production, wait for payment provider confirmation)
    transaction.status = 'completed';
    this.saveTransaction(transaction);
    return transaction;
  },

  // Verify payment with provider
  async verifyPayment(transactionId: string): Promise<boolean> {
    // TODO: Call Stripe/PayPal API to verify payment status
    const transaction = this.getTransaction(transactionId);
    return transaction?.status === 'completed' || false;
  },

  // Save transaction to localStorage
  saveTransaction(transaction: PaymentTransaction): void {
    localStorage.setItem(`gargaar_txn_${transaction.transactionId}`, JSON.stringify(transaction));
  },

  // Get transaction by ID
  getTransaction(transactionId: string): PaymentTransaction | null {
    const data = localStorage.getItem(`gargaar_txn_${transactionId}`);
    return data ? JSON.parse(data) : null;
  },

  // Get all transactions for user
  getUserTransactions(userId: string): PaymentTransaction[] {
    const transactions: PaymentTransaction[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('gargaar_txn_')) {
        const data = localStorage.getItem(key);
        if (data) {
          const txn = JSON.parse(data);
          if (txn.userId === userId) transactions.push(txn);
        }
      }
    }
    return transactions;
  },
};

export default PaymentSystem;
