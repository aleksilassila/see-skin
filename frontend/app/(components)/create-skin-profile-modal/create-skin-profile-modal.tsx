import { Modal, ModalHeader } from "../ui/modal";
import { useVisibleState } from "../ui/drawer";

export default function CreateSkinProfileModal() {
  const modalState = useVisibleState();
  return (
    <Modal {...modalState}>
      <ModalHeader {...modalState}>Create a Skin Profile</ModalHeader>
    </Modal>
  );
}
