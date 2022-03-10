import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

import styled from 'styled-components';
import { Button } from '../components/Header';

const CartModal = ({ children, setModalOpen, show }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: show ? 1 : 0,
    transform: show ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setModalOpen(false);
    }
  };

  return (
    <ModalDiv
      block={show ? 'block' : 'none'}
      onClick={closeModal}
      ref={modalRef}
    >
      <animated.div style={animation}>
        <ContentDiv>
          <ModalItems>{children}</ModalItems>
        </ContentDiv>
      </animated.div>
    </ModalDiv>
  );
};

export default CartModal;

const ModalDiv = styled.div`
  display: ${(p) => p.block && p.block};
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: 100%;
  background: #39374838;
  z-index: 1;
`;
const ContentDiv = styled.div`
  max-height: 540px;
  position: fixed;
  top: 0px;
  right: 98px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: white;
  z-index: 1;
`;

const ModalItems = styled.div``;
