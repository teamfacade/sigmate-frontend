import Image from 'next/image';
import { useCallback, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import { UpIcon } from 'public/Icons/landingPage';
import styles from 'styles/styleLib';

export default function GoUpBtn() {
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => window.scrollTo(0, 0),
    []
  );

  return (
    <Wrapper>
      <Btn onClick={onClick}>
        <ImageWrapper width="60%" height="fit-content">
          <Image src={UpIcon} layout="responsive" />
        </ImageWrapper>
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
  z-index: 5;
`;

const Btn = styled.button`
  position: relative;
  width: min(115px, 20vw);
  height: min(115px, 20vw);
  padding: 0;
  border: none;
  border-radius: 125px;
  background-color: #ffffff;
  box-shadow: 0 30px 120px 0 rgba(58, 65, 72, 0.4);

  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
