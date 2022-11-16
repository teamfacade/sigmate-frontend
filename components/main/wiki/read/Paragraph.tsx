import dynamic from 'next/dynamic';
import { memo } from 'react';
import styled from 'styled-components';

type PropsType = {
  content: string;
};

const DynamicMarkdown = dynamic(() => import('../read/MarkdownRendered'), {
  ssr: false,
});

export default memo(function Paragraph({ content }: PropsType) {
  return (
    <Div>
      <DynamicMarkdown content={content} />
    </Div>
  );
});

const Div = styled.div`
  color: #222222;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 160%;

  p {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
  }

  p + p {
    margin-top: 22px;
  }

  img {
    width: 100%;
  }
`;
