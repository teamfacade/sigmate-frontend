import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import styles from 'styles/styleLib';
import dynamic from 'next/dynamic';

type PropsType = {
  content: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  showHide: boolean;
};

const DynamicMarkdown = dynamic(
  () => import('components/main/wiki/read/MarkdownRendered'),
  {
    ssr: false,
  }
);

export default memo(function FullText({
  content,
  onClick,
  showHide,
}: PropsType) {
  return (
    <div>
      <Text>
        <DynamicMarkdown content={content} />
      </Text>
      {showHide && (
        <BtnWrapper>
          <HideBtn onClick={onClick}>Hide</HideBtn>
        </BtnWrapper>
      )}
    </div>
  );
});

const Text = styled.div`
  p {
    width: 100%;
    margin: 5px 0 0 0;
    color: ${styles.colors.logColor};
    font-size: 16px;
    font-weight: 300;
    line-height: 130%;
    white-space: pre-line;
    line-break: anywhere;
  }

  li {
    font-size: 14px;
    line-height: 160%;
  }
`;

const BtnWrapper = styled.div`
  position: relative;
  height: 17px;
`;

const HideBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  color: ${styles.colors.emphColor};
  font-size: 14px;
  font-weight: 300;
  font-family: 'Inter', sans-serif;
  cursor: pointer;

  :hover,
  :active {
    color: ${darken(0.3, styles.colors.emphColor)};
  }
`;
