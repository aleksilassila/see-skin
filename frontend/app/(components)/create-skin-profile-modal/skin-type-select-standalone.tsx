import { AnchorButton, Button } from "../ui/button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CreateSkinProfileModal, {
  useCreateSkinProfileModalState,
} from "./create-skin-profile-modal";
import { SkinTypeSelect } from "./panels/skin-type-select";
import { useSession } from "../../user";

export default function SkinTypeSelectStandalone() {
  const createSkinProfileState = useCreateSkinProfileModalState();
  const { skinTypeSelectState } = createSkinProfileState;

  const session = useSession();

  function openModal() {
    createSkinProfileState.stepsState.open(1);
    createSkinProfileState.modalState.open();
  }

  if (session.skinProfile) {
    return (
      <div className="flex justify-center">
        <AnchorButton
          href={"/products"}
          nextLink={true}
          trailingIcon={faArrowRight}
          intent="primary"
        >
          View Products
        </AnchorButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-white rounded-2xl mx-auto px-10 py-6 gap-4 border border-stone-400">
      <SkinTypeSelect {...skinTypeSelectState} />
      <Button
        intent="primary"
        disabled={!skinTypeSelectState.getSkinType()}
        trailingIcon={faArrowRight}
        onClick={openModal}
      >
        Continue
      </Button>
      <CreateSkinProfileModal {...createSkinProfileState} />
    </div>
  );
}
