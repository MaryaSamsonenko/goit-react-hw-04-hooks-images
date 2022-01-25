import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import { Overlay, ModalStyled } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    });
  }, [onClose]);

  useEffect(() => {
    window.removeEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    });
  }, [onClose]);

  const handleBackdrope = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdrope}>
      <ModalStyled>{children}</ModalStyled>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
