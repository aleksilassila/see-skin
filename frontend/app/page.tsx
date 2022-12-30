import { AnchorHTMLAttributes, HTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface CardContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "lg";
}

function CardContainer({
  size = "lg",
  ...props
}: PropsWithChildren<CardContainerProps>) {
  const className = classNames(
    props.className,
    "rounded-xl drop-shadow overflow-hidden",
    "grid grid-cols-[1.5rem_1fr_1fr_1.5rem] py-6",
    {
      "col-span-2": size === "lg",
    }
  );
  return <div className={className}>{props.children}</div>;
}

function CardLink(props: AnchorHTMLAttributes<any>) {
  const className = classNames(
    props.className,
    "text-sm font-medium",
    "inline-flex mt-6",
    "items-center gap-2"
  );
  return (
    <Link href={props.href || ""} className={className}>
      {props.children}{" "}
      <FontAwesomeIcon className="inline h-4" icon={faArrowRightLong} />
    </Link>
  );
}

export default function Page() {
  const cardHeading = classNames("font-medium text-xl mb-2");

  const cardBody = classNames("font-medium text-sm col-start-2 col-span-2");

  const imageIgnorePadding = classNames("col-span-4");

  return (
    <div className="flex flex-col items-center gap-8 mb-8">
      <div
        id="landing"
        className="w-screen h-96 flex items-center justify-center bg-red-50"
      >
        <div id="welcome" className="max-w-2xl mx-8 sm:mx-16 xl:mx-24">
          <h1 id="header" className="text-3xl font-bold mb-2">
            Find all your skincare products in one place.
          </h1>
          <p id="description" className="font-medium">
            Insert products into the box below that you suspect cause you
            irritation, breakouts, or any adverse effect, or those that you
            didn&apos;t have any benefit from.
          </p>
        </div>
        <div id="solver"></div>
      </div>
      <div id="cards" className="grid grid-cols-2 gap-4 max-w-xl mx-2">
        <CardContainer className="bg-[#2B353F] text-white">
          <div className="col-start-2 col-span-1 flex flex-col justify-center">
            <h2 className={cardHeading}>Cleaning your buying experience</h2>
            <p className={cardBody}>
              We build you a skin profile that filters through tens of thousands
              of products to a personalized few. Shop with your favorite
              retailer through our products section
            </p>
            <CardLink href="/products">Find your product</CardLink>
          </div>
          <Image
            className={"col-span-2 col-start-3"}
            src="/images/brand-logos.png"
            alt=""
            width={300}
            height={300}
          />
        </CardContainer>
        <CardContainer size="sm" className="bg-white">
          <div className="col-start-2 col-span-2">
            <h2 className={cardHeading}>
              Find your <span className="text-red-500">adversary</span>{" "}
              ingredients
            </h2>
          </div>
          <Image
            className={imageIgnorePadding}
            src="/images/molecule.jpeg"
            alt=""
            width={300}
            height={300}
          />
          <CardLink href="/skin-solver" className="col-start-2 col-span-2">
            Use Skin Solver
          </CardLink>
        </CardContainer>
        <CardContainer size="sm" className="bg-[#FF6565] text-white">
          <div className="col-start-2 col-span-2">
            <h2 className={cardHeading}>
              Find your <span className="text-lime-400">beneficial</span>{" "}
              ingredients
            </h2>
          </div>
          <Image
            className={classNames(imageIgnorePadding, "mt-auto -mb-6")}
            src="/images/under-construction.png"
            alt=""
            width={300}
            height={300}
          />
        </CardContainer>
        <CardContainer className="bg-[#231F20] text-white">
          <Image
            className={"col-span-2"}
            style={{ transform: "scaleX(-1)" }}
            src="/images/notebook.png"
            alt=""
            width={300}
            height={300}
          />
          <div className="col-start-3 flex flex-col justify-center">
            <h2 className={cardHeading}>Double-check your products</h2>
            <p className={cardBody}>
              Our app makes sure that any skincare or cosmetic product you buy
              is clear of your individual bad ingredients and is compatible with
              your skin
            </p>
            <CardLink href="/skin-solver">Use the Checker</CardLink>
          </div>
        </CardContainer>
        <CardContainer className="bg-[#9C30F1] text-white">
          <div className="col-start-2 flex flex-col justify-center">
            <h2 className={cardHeading}>see-skin for business</h2>
            <p className={cardBody}>
              We connect customers to products that they have confidence in.
              Join our waiting list to get exclusive priority in posting
              products on our platform.
            </p>
            <CardLink href="/">Work with us</CardLink>
          </div>
          <Image
            className={"col-span-2 max-h-40 w-auto justify-self-center flex"}
            src="/images/suitcase.png"
            alt=""
            width={300}
            height={300}
          />
        </CardContainer>
      </div>
    </div>
  );
}
