import { HTMLAttributes, useState } from "react";
import Button, { WhiteButton } from "../../app/(ui)/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SkinTypeSelect from "./SkinTypeSelect";
import UsedProductsSelect from "./UsedProductsSelect";
import { BackButton, ContinueButton } from "./PageControls";

const Container = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className="bg-stone-300 max-w-lg flex flex-col p-2 rounded-xl h-96 gap-2 mx-auto shadow-lg justify-between items-center">
    {props.children}
  </div>
);

interface Props {}

const IrritantSearchForm = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  const [skinType, setSkinType] = useState<string | undefined>(undefined);
  const [usedProductIds, setUsedProductIds] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);

  if (page === 0) {
    return (
      <Container>
        <BackButton page={page} setPage={setPage} className="self-start" />
        <SkinTypeSelect updateSkinType={setSkinType} />
        <ContinueButton
          skinType={skinType}
          usedProductIds={usedProductIds}
          page={page}
          setPage={setPage}
        />
      </Container>
    );
  } else if (page === 1) {
    return (
      <Container>
        <BackButton page={page} setPage={setPage} />
        <UsedProductsSelect updateSelectedProducts={setUsedProductIds} />
        <ContinueButton
          page={page}
          setPage={setPage}
          skinType={skinType}
          usedProductIds={usedProductIds}
        />
      </Container>
    );
  } else if (page === 2) {
    return <Container></Container>;
  }
};

export default IrritantSearchForm;
