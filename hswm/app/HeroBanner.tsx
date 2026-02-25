import { ReactNode } from "react";

type HeroBannerProps = {
  message: string;
  actionButton?: ReactNode;
};

const HeroBanner = ({ message, actionButton }: HeroBannerProps) => {
  return (
    <div className="hero-banner">
      <h1 className="hero-message">{message}</h1>
      {actionButton && <div className="ml-6">{actionButton}</div>}
    </div>
  );
};

export default HeroBanner;
