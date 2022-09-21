import { HTMLAttributes } from "react";
import PageWithNavigation from "../containers/PageWithNavigation";
import styled from "../components/Styled";
import Link from "next/link";

interface Props {}

const MainContent = styled("m-auto max-w-2xl py-24 px-8 flex flex-col gap-32");
const MainSubcontent = styled("flex flex-col items-center items-center");

const Heading = styled("text-6xl font-black mb-6 text-center");
const Subheading = styled("text-center");
const Subheading2 = styled("font-bold text-xl text-center");

const Products = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  return (
    <PageWithNavigation href="/products">
      <MainContent>
        <MainSubcontent>
          <Heading>Welcome back Eetu!</Heading>
          <Subheading>
            Everything you see here is curated to your skin profile so that you
            don’t have to fiddle with skintype parameters and ingredient
            checking!
          </Subheading>
          <Subheading2>
            Already have a product in mind? Head to the{" "}
            <Link href="/checker">
              <a className="underline">Catalogue</a>
            </Link>{" "}
            tab to check if it fits your skin!
          </Subheading2>
        </MainSubcontent>
      </MainContent>
    </PageWithNavigation>
  );
};

export default Products;
