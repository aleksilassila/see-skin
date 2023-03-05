import { Button } from "../../(ui)/button";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface TabControlProps {
  // currentTab: number;
  onClick: () => void;
  isHidden?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export function NextTab({
  isHidden = false,
  isLoading = false,
  isDisabled = false,
  ...props
}: TabControlProps) {
  if (isHidden) return null;
  return (
    <Button
      intent="primary"
      disabled={isDisabled}
      loading={isLoading}
      onClick={() => props.onClick()}
      trailingIcon={faChevronRight}
    >
      Continue
    </Button>
  );
}

export function PreviousTab({
  isHidden = false,
  isLoading = false,
  isDisabled = false,
  ...props
}: TabControlProps) {
  if (isHidden) return null;
  return (
    <Button
      disabled={isDisabled}
      loading={isLoading}
      onClick={() => props.onClick()}
      leadingIcon={faChevronLeft}
    >
      Previous
    </Button>
  );
}
