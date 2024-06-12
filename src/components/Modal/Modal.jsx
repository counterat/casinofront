import { useRef } from 'react';
import ModalWindow from 'react-modal';

import { useClickOutside } from '../../hooks';

import './Modal.scss';

ModalWindow.setAppElement('#root');

export const Modal = ({
  children,
  isOpen = false,
  closeTimeoutMS = 200,
  ariaHideApp = false,
  customStyles = {},
  toggleModal,
  ...props
}) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, () => {
    if (toggleModal) {
      toggleModal(isOpen);
    }
  });

  return (
    <ModalWindow
      isOpen={isOpen}
      style={customStyles}
      closeTimeoutMS={closeTimeoutMS}
      ariaHideApp={ariaHideApp}
      preventScroll
      {...props}
    >
      <div ref={modalRef}>
        {children}
      </div>
    </ModalWindow>
  );
};
