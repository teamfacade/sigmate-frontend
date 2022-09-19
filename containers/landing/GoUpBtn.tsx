import { useCallback, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Up } from 'public/Icons/landingPage';
import styles from 'styles/styleLib';

export default function GoUpBtn() {
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => window.scrollTo(0, 0),
    []
  );

  return (
    <Wrapper>
      <Btn onClick={onClick}>
        <Up />
      </Btn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  right: 32px;
  bottom: 28px;
  border-radius: 125px;
  box-shadow: ${styles.shadows.modalShadow};
`;

const Btn = styled.button`
  position: relative;
  width: 125px;
  height: 115px;
  border: none;
  border-radius: 125px;
  background-color: #ffffff;
  box-shadow: 0 30px 120px 0 rgba(58, 65, 72, 0.4);

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
