export default function PromotionSelection({ blok }: { blok: any }) {
  const promo = blok.active_promo?.[0];

  if (!promo) return null;

  return (
    <div className="promo-banner">
      <p className="promo-text">
        {promo.content?.promo_message ?? "Omaha's Premier Wine Vendor"}
      </p>
    </div>
  );
}
