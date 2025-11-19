// Trial Management System for Gargaar AI Learning Academy
// Free for 7 days, then requires payment

interface UserTrial {
  userId: string;
  email: string;
  registrationDate: number; // timestamp
  trialEndDate: number; // timestamp (registration date + 7 days)
  isPaid: boolean;
  subscription?: {
    plan: 'monthly' | 'yearly';
    startDate: number;
    renewalDate: number;
  };
}

export const TrialManager = {
  // Check if user is within free trial period
  isTrialActive(user: UserTrial): boolean {
    if (user.isPaid) return true; // Paid users have full access
    const now = Date.now();
    return now < user.trialEndDate;
  },

  // Get remaining trial days
  getRemainingTrialDays(user: UserTrial): number {
    if (user.isPaid) return Infinity;
    const now = Date.now();
    const remainingMs = user.trialEndDate - now;
    return Math.ceil(remainingMs / (1000 * 60 * 60 * 24));
  },

  // Create new user trial (7 days from now)
  createNewTrial(userId: string, email: string): UserTrial {
    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    return {
      userId,
      email,
      registrationDate: now,
      trialEndDate: now + sevenDaysMs,
      isPaid: false,
    };
  },

  // Mark user as paid
  markAsPaid(user: UserTrial, plan: 'monthly' | 'yearly'): UserTrial {
    const now = Date.now();
    const renewalMs = plan === 'monthly' ? 30 * 24 * 60 * 60 * 1000 : 365 * 24 * 60 * 60 * 1000;
    return {
      ...user,
      isPaid: true,
      subscription: {
        plan,
        startDate: now,
        renewalDate: now + renewalMs,
      },
    };
  },

  // Save user to localStorage
  saveUser(user: UserTrial): void {
    localStorage.setItem(`gargaar_user_${user.userId}`, JSON.stringify(user));
  },

  // Load user from localStorage
  loadUser(userId: string): UserTrial | null {
    const data = localStorage.getItem(`gargaar_user_${userId}`);
    return data ? JSON.parse(data) : null;
  },
};

export default TrialManager;
