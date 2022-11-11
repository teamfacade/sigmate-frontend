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
  p {
    margin: 0;
    color: #222222;
    font-size: 14px;
    white-space: pre-wrap;
    word-break: break-word;
  }
`;
