import React from "react";
import Popup from "reactjs-popup";
import {
  Close,
  ContainerHeader,
  ContainerModal,
  Content,
  Hr,
  Modal,
  TitleModal,
} from "./modalStyles";

interface IModal {
  children: React.ReactNode;
  openModal: boolean;
  closeModal: () => void;
  contentStyle?: React.CSSProperties;
  title: string;
}

const ModalComponent: React.FC<IModal> = ({
  children,
  openModal,
  closeModal,
  contentStyle,
  title,
}) => {
  return (
    <Popup
      modal
      open={openModal}
      contentStyle={
        contentStyle || {
          backgroundColor: "var(--white)",
          padding: "1rem",
          borderRadius: "20px",
          textAlign: "center",
          display: "grid",
          color: "var(--color-primary-dark)",
          maxHeight: "90vh",
          overflowY: "auto",
        }
      }
      closeOnDocumentClick={false}
      onClose={closeModal}
      overlayStyle={{
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: "1rem",
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
    >
      <ContainerModal>
        <Modal>
          <ContainerHeader>
            <TitleModal id="modal-title">{title}</TitleModal>
            <Close onClick={closeModal}>&times;</Close>
          </ContainerHeader>
          <Hr />
          <Content id="modal-content">{children}</Content>
        </Modal>
      </ContainerModal>
    </Popup>
  );
};

export default ModalComponent;
