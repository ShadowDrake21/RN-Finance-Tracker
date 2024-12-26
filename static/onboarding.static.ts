import animation1 from '@/assets/animations/onboarding/Animation-1.lottie';
import animation2 from '@/assets/animations/onboarding/Animation-2.lottie';
import animation3 from '@/assets/animations/onboarding/Animation-3.lottie';
import { OnboardingItem } from '@/types/types';

export const onboardingItems: OnboardingItem[] = [
  {
    animationPath: animation1,
    title: 'Track Your Spending',
    description:
      'Easily monitor and categorize your daily expenses to stay on top of your budget.',
  },
  {
    animationPath: animation2,
    title: 'Set Your Financial Goals',
    description:
      'Create goals for savings, investments, and more, and track your progress over time.',
  },
  {
    animationPath: animation3,
    title: 'Smart Reports & Insights',
    description:
      'Get personalized insights and reports to understand where your money is going and optimize your spending.',
  },
];
