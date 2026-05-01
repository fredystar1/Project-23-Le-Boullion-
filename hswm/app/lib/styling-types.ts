export type itemVariantsUI = "featured" | "detailed" | "list" | "pricingItem";

export const photoFrameClass = {
  none: "photo-frame",
  left: "photo-frame-left",
  right: "photo-frame-right",
} as const;

export type Tilt = keyof typeof photoFrameClass;
