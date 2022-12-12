import type { NextPage } from "next";
import PageWithNavigation from "../containers/PageWithNavigation";
import { HTMLAttributes } from "react";
import styled from "../components/Styled";
import IrritantSearchForm from "../components/IrritantSearchForm/IrritantSearchForm";
import { BlueButton } from "../app/(ui)/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import Logo from "../app/(navigation)/Logo";

const MainContent = styled("m-auto max-w-2xl py-24 px-8 flex flex-col gap-32");
const MainSubcontent = styled("flex flex-col items-center items-center");

const Heading = styled("text-2xl font-black mb-6 text-center");
const Subheading = styled("font-bold text-center");

const Home: NextPage = () => {
  return (
    <PageWithNavigation href={"/"}>
      <MainContent>
        <MainSubcontent>
          <Heading>Find your individual irritants all in one place.</Heading>
          <Subheading>
            Insert products or ingredients that have caused you irritation,
            breakouts or any adverse effect into the box below:
          </Subheading>
          <div className="mt-12 font-extrabold self-stretch">
            <IrritantSearchForm />
          </div>
        </MainSubcontent>
        <MainSubcontent>
          <Heading>Hard to choose from 30 000+ skincare products?</Heading>
          <Subheading>
            Our webapp builds you a skinprofile in a flash that filters through
            tens of thousands of products to a precious few automatically!
          </Subheading>
          <BlueButton className="mt-16">
            Register For Free
            <FontAwesomeIcon className="pl-2" icon={faCircleArrowRight} />
          </BlueButton>
        </MainSubcontent>
        <MainSubcontent>
          <Heading>Eyeing a new product? Check with us first!</Heading>
          <Subheading>
            Our Catalogue boasts 20 000+ different products and 3000+
            ingredients and coupled with your profile{" "}
            <span className="underline">
              we know if a product is suitable with your skin
            </span>
            .
          </Subheading>
          <BlueButton className="bg-[#000000] text-white mt-16">
            Catalogue
          </BlueButton>
        </MainSubcontent>
      </MainContent>
    </PageWithNavigation>
  );
};

export default Home;
