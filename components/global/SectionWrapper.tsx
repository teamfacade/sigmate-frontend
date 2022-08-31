import { memo, MouseEventHandler, ReactNode } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { ModalBack } from 'public/Icons/global';

type PropsType = {
  onClickBack?: MouseEventHandler<HTMLButtonElement>;
  header: string;
  marginBottom?: string;
  children: ReactNode;
};

export default memo(function SectionWrapper({
  onClickBack,
  header,
  marginBottom,
  children,
}: PropsType) {
  return (
    <Wrapper marginBottom={marginBottom}>
      <HeadWrapper>
        {onClickBack && (
          <TransparentBtn onClick={onClickBack}>
            <ModalBack />
          </TransparentBtn>
        )}
        <Heading>{header}</Heading>
      </HeadWrapper>
      <hr />
      {children}
    </Wrapper>
  );
});

const Wrapper = styled.div<{ marginBottom: string | undefined }>`
  position: relative;
  width: 100%;

  hr {
    margin: ${({ marginBottom }) => `18px 0 ${marginBottom || '30px'} 0`};
    border: none;
    border-bottom: 1px solid #dedede;
  }

  & + & {
    margin-top: 50px;
  }
`;

const HeadWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TransparentBtn = styled.button`
  padding: 0;
  margin: 0 15px 0 0;
  background-color: transparent;
  border: none;

  svg path {
    fill: #c7cdd6;
  }

  :hover {
    svg path {
      filter: brightness(0.7);
    }
  }
`;

const Heading = styled.h3`
  margin: 0;
  color: ${styles.colors.headerColor};
`;
