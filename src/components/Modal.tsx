import React, { FC, ReactNode, useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';

interface ModalProps {
  children: ReactNode;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const Modal: FC<ModalProps> = ({ children, showModal, setShowModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  //CLOSE MODAL OUTSIDE THE AREA
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  //ANIMATION
  const modalAnimation = useSpring({
    opacity : showModal ? 1 : 0,
    top : showModal ? '25%' : '0%',
    config : { friction : 10 }
  })

  //RENDERING MODAL
  return showModal ? (
    <div className="Modal" ref={modalRef} onClick={closeModal}>
      <animated.div style={modalAnimation} className="container">{children}</animated.div>
    </div>
  ) : null;
};

export default Modal;
