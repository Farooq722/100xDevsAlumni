import { FormDemo } from "../Uicomponents/FormDemo";
import { HeroHighlightDemo } from "../Uicomponents/HeroHighlightDemo";
import { InfiniteMovingCardsDemo } from "../Uicomponents/InfiniteMovingCardsDemo";
import { Footer } from "./Footer";
import { Page1 } from "./Page1";
import { Page2 } from "./Page2";
import TypewriterEffectSmoothDemo from "../Uicomponents/TypewriterEffectSmoothDemo";

export const Body = () => {
  return (
    <div className="">
      <HeroHighlightDemo />
      <TypewriterEffectSmoothDemo />
      <InfiniteMovingCardsDemo />
      <Page1 />
      <Page2 />
      <FormDemo />
      <Footer />
    </div>
  );
};
