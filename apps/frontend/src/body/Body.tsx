import React, { Suspense } from "react";
import { FormDemo } from "../Uicomponents/FormDemo";
import { HeroHighlightDemo } from "../Uicomponents/HeroHighlightDemo";
import { InfiniteMovingCardsDemo } from "../Uicomponents/InfiniteMovingCardsDemo";
const TypewriterEffectSmoothDemo = React.lazy(() => import('../Uicomponents/TypewriterEffectSmoothDemo'));
import { Footer } from "./Footer";
import { Page1 } from "./Page1";
import { Page2 } from "./Page2";

export const Body = () => {
  return (
    <div className="">
      <HeroHighlightDemo />
      <Suspense fallback={<h1>loading ...</h1>}><TypewriterEffectSmoothDemo /></Suspense>
      <InfiniteMovingCardsDemo />
      <Page1 />
      <Page2 />
      <FormDemo />
      <Footer />
    </div>
  );
};
