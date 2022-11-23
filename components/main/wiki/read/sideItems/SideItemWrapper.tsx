import {
  memo,
  useState,
  useCallback,
  MouseEventHandler,
  ReactNode,
} from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { Unfold } from 'public/Icons/main/wiki/read/SideItems';

type PropsType = {
  header: string;
  children: ReactNode;
};

export default memo(function SideItemWrapper({ header, children }: PropsType) {
  const [show, setShow] = useState(header === "What's happening");
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShow((current) => !current),
    []
  );

  return (
    <Wrapper>
      <Header>{header}</Header>
      <OuterWrapper>
        <InnerWrapper show={show}>{children}</InnerWrapper>
      </OuterWrapper>
      <FoldBtn show={show} onClick={onClick}>
        <Unfold />
      </FoldBtn>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
  padding: 20px;
  margin-top: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: ${styles.shadows.containerShadow};
`;

const Header = styled.h2`
  margin: 0;
  color: ${styles.colors.headerColor};
  font-size: 16px;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
`;

const FoldBtn = styled.button<{ show: boolean }>`
  position: absolute;
  top: ${({ show }) => (show ? '22px' : '25px')};
  right: 20px;
  background-color: transparent;
  border: none;
  transform: ${({ show }) => (show ? 'rotate(-180deg)' : 'none')};
  transition: all 300ms ease-in-out;
`;

const OuterWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const InnerWrapper = styled.div<{ show: boolean }>`
  padding: ${({ show }) => (show ? '20px 0 0 0' : '0')};
  margin-top: ${({ show }) => (show ? '0' : '-200%')};
  transition: all 300ms ease-in-out;
`;
