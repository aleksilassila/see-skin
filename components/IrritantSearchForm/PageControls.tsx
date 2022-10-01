import Button, { WhiteButton } from "../ui/Button";
import { HTMLAttributes } from "react";

export const ContinueButton = (props: {
  page: number;
  setPage: (page: number) => void;
  skinType: string | undefined;
  usedProductIds: string[] | undefined;
}) => {
  return (
    <WhiteButton
      className={`self-center`}
      onClick={() => props.setPage(props.page + 1)}
      enabled={
        (props.page === 0 && props.skinType !== undefined) || props.page === 1
      }
    >
      Continue
    </WhiteButton>
  );
};

export const BackButton = (
  props: {
    page: number;
    setPage: (page: number) => void;
  } & HTMLAttributes<HTMLDivElement>
) => {
  return (
    <Button
      {...props}
      onClick={() => props.setPage(Math.max(0, Math.min(2, props.page - 1)))}
    >
      Back
    </Button>
  );
};
