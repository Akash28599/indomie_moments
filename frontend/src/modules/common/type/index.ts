export interface CTADecoration {
  component: React.ComponentType<any>;
  className: string;
  delay?: number;
}

export interface CTAButton {
  label: string;
  to: string;
  variant?: "primary" | "secondary";
}

export interface CTAConfig {
  id: string;
  backgroundClass: string;
  title: string;
  subtitle?: string;
  button: CTAButton;
  decorations?: CTADecoration[];
  showWhenAuth?: boolean;
}
