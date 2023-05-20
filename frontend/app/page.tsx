"use client";
import classNames from "classnames";
import Image from "next/image";
import SkinTypeSelect from "./(components)/skin-type-select/skin-type-select";
import { Button } from "./(components)/ui/button";
import IngredientGraphPicture from "../public/images/ingredient-graph.png";
import iPhoneDemoPicture from "../public/images/iphone-11-demo.png";
import { WithNavigation } from "./(navigation)/with-navigation";

function Page() {
  return (
    <div className="">
      <Welcome />
      <IngredientAnalysisAbout />
      <RetailersAbout />
    </div>
  );
}

const sectionContainerStyle = classNames(
  "relative flex bg-cover bg-no-repeat bg-center items-center justify-center",
  "py-16 px-8"
);

const sectionContainerSmallStyle = classNames(
  sectionContainerStyle,
  "min-h-[50vh] gap-8",
  "flex-col",
  "md:flex-row"
);

const headingStyle = "font-medium text-3xl lg:text-5xl";

const paragraphStyle = "leading-1 text-md lg:text-lg";

function Welcome() {
  return (
    <div
      className={classNames(sectionContainerStyle, "min-h-[70vh]")}
      style={{ backgroundImage: "url(/images/frontpage-gradient.jpg)" }}
    >
      <div className="max-w-xl mx-8 sm:mx-16 xl:mx-24 flex flex-col">
        <h1 className="text-5xl font-semibold mb-2 text-center text-stone-900">
          Removing the trial & error from skincare
        </h1>
        <p className="font-medium mb-8 text-center text-stone-800">
          {
            "Personalized skincare recommendations and ingredient analysis from products that didn't work for you."
          }
        </p>
        <SkinTypeSelect />
      </div>
    </div>
  );
}

function IngredientAnalysisAbout() {
  return (
    <div
      className={sectionContainerSmallStyle}
      style={{ backgroundImage: "url('/images/radar.jpg')" }}
    >
      <div className="flex flex-col gap-4 max-w-sm xl:max-w-lg">
        <h1 className={classNames(headingStyle, "text-stone-900")}>
          In-depth ingredient analysis
        </h1>
        <p className={classNames(paragraphStyle, "text-stone-700")}>
          We use a data-driven approach to find irritants & bad ingredients
          personal to your skin, using your past skincare & cosmetic products.
        </p>
        <p className={classNames(paragraphStyle, "text-stone-700")}>
          With a database consisting of 14 000+ products & 30 000+ ingredients,
          we can deduce almost any situation with accuracy.
        </p>
        <div>
          <Button intent="special">Get Started</Button>
        </div>
      </div>
      <Image
        src={IngredientGraphPicture}
        alt="Ingredient Graph"
        className="border border-stone-400 rounded-xl max-w-xs lg:max-w-md"
      />
    </div>
  );
}

function RetailersAbout() {
  return (
    <div className="relative bg-black">
      <div
        className="bg-cover bg-no-repeat bg-center absolute inset-0"
        style={{
          backgroundImage: "url('/images/scribble.svg')",
          opacity: 0.3,
        }}
      />
      <div
        className={classNames(
          sectionContainerSmallStyle,
          "flex-col-reverse md:flex-row"
        )}
      >
        <Image
          src={iPhoneDemoPicture}
          alt="Ingredient Graph"
          className="max-w-xs lg:max-h-md"
        />
        <div className="flex flex-col gap-4 max-w-sm xl:max-w-lg">
          <h1 className={classNames(headingStyle, "text-stone-50")}>
            Better skincare from the best retailers
          </h1>
          <p className={classNames(paragraphStyle, "text-stone-300")}>
            From a pool of thousands of skincare products, we narrow down on
            ones that fit the best with your skin.
          </p>
          <p className={classNames(paragraphStyle, "text-stone-300")}>
            Identified ingredients are automatically excluded and products are
            catered to your individual skin profile and concerns.
          </p>
          <div>
            <Button intent="special">Get better products now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithNavigation(Page);
