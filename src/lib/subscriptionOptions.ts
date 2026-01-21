export type SubscriptionModuleId =
  | "disease_progression"
  | "safety_risk"
  | "therapy_response";

export const SUBSCRIPTION_MODULES: Array<{
  id: SubscriptionModuleId;
  title: string;
  description: string;
}> = [
  {
    id: "disease_progression",
    title: "Disease Progression & Functional Intelligence",
    description: "Track functional change and progression insights."
  },
  {
    id: "safety_risk",
    title: "Safety & Risk Intelligence",
    description: "Surface safety signals and risk indicators."
  },
  {
    id: "therapy_response",
    title: "Therapy Response & Efficacy Intelligence",
    description: "Measure response, efficacy, and outcomes."
  }
];

export function getSubscriptionPrice(moduleCount: number) {
  if (moduleCount === 1) {
    return 99.99;
  }
  if (moduleCount === 2) {
    return 159.99;
  }
  if (moduleCount === 3) {
    return 199.99;
  }
  return null;
}

export function getSubscriptionTier(moduleCount: number) {
  if (moduleCount === 1) {
    return "any_1";
  }
  if (moduleCount === 2) {
    return "any_2";
  }
  if (moduleCount === 3) {
    return "any_3";
  }
  return null;
}
