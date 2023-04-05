import { memo } from 'react';
import styled from 'styled-components';
import {
  HeaderBlock,
  ParagraphBlock,
  TableBlock,
  ListBlock,
} from 'editorjs-blocks-react-renderer';

type PropsType = {
  element: string;
  content: any;
};

// @todo Block type 만들기 / 찾기
const Components: StringKeyObj<any> = {
  paragraph: ParagraphBlock,
  header: HeaderBlock,
  table: TableBlock,
  list: ListBlock,
};

export default memo(function ReadComponent({ element, content }: PropsType) {
  const Component = Components[element];

  return (
    <MarginErase>
      <Component data={content} />
    </MarginErase>
  );
});

const MarginErase = styled.div`
  > * {
    margin: 0;
  }
`;
