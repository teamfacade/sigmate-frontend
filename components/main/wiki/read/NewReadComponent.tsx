import { memo } from 'react';
import styled from 'styled-components';
import {
  HeaderBlock,
  ParagraphBlock,
  TableBlock,
  ListBlock,
} from 'editorjs-blocks-react-renderer';
import styles from 'styles/styleLib';

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

const tableStyle = `
  > table {
    border-collapse: collapse;
    border-top: 1px solid ${styles.colors.hrColor};
    border-bottom: 1px solid ${styles.colors.hrColor};
    
    > thead > tr {
      border-bottom: 2px solid ${styles.colors.hrColor};
    }
    
    > tbody > tr:not(:first-child) {
      border-top: 1px solid ${styles.colors.hrColor};
    }
    
    th:not(:last-child), td:not(:last-child) {
      border-right: 1px solid ${styles.colors.hrColor};
    }
    
    th, td {
      padding: 8px;
    }
  }
`;

const MarginErase = styled.div`
  > * {
    margin: 0;
  }

  ${tableStyle};
`;
