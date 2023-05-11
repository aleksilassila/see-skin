import { Modal, ModalHeader, useModalState } from "../ui/modal";

export default function CreateSkinProfileModal() {
  const modalState = useModalState();
  return (
    <Modal {...modalState}>
      <ModalHeader {...modalState}>Create a Skin Profile</ModalHeader>
    </Modal>
  );
}
