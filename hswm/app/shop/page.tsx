import Button from "../Button";
import HeroBanner from "../HeroBanner";
import ShopGrid from "../ShopGrid";
export default function Page() {
  return (
    <>
      <HeroBanner
        message="Explore your perfect wine match"
        actionButton={
          <Button
            buttonText="Take the quiz &rarr;"
            className="action-button font-change"
          />
        }
      />
      <ShopGrid />
    </>
  );
}
