import { HTMLAttributes } from "react";
import PageWithNavigation from "../containers/PageWithNavigation";
import styled from "../components/Styled";
import Logo from "../app/(navigation)/Logo";
import SearchInput from "../components/ui/SearchInput";

interface Props {}

const MainContent = styled(
  "my-48 flex flex-col items-center max-w-md m-auto text-center"
);
const Heading = styled("text-4xl font-bold mb-4");
const Paragraph = styled("text-xl px-4 mb-4");
const Note = styled("text-stone-400 font-light");

const ProductSearch = <SearchInput className="self-stretch mb-12" />;

const Checker = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  return (
    <PageWithNavigation href={"/checker"}>
      <MainContent>
        <Logo className="text-8xl decoration-8 mb-8" />
        <Heading>Checker</Heading>
        <Paragraph>
          Type any product into the search below to see if it fits your skin!
        </Paragraph>
        {ProductSearch}
        <Note>
          Can’t find your product? Consider{" "}
          <span className="underline font-bold">submitting it</span> to help
          others!
        </Note>
      </MainContent>
    </PageWithNavigation>
  );
};

export default Checker;
