import React from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";

const Modal = ({ closeModal, children }) => {
  return (
    <StyledModal>
      <div className="modal">
        <button type="button" className="btn icon-btn close-btn" onClick={closeModal}>
          <FiX className="icon" />
        </button>
        {children}
      </div>
    </StyledModal>
  );
};

export default Modal;

const StyledModal = styled.section`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;

  .modal {
    width: 95%;
    height: 80vh;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
    background: var(--clr-secondary-dark);
    position: relative;
  }

  .close-btn {
    position: absolute;
    right: 0;
    top: -0.5rem;
    transform: translateY(-100%);
    background: var(--clr-primary-dark2);
    &:hover {
      background: var(--clr-primary-dark);
    }
  }
`;
