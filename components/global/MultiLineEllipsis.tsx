import { memo } from 'react';
import styled from 'styled-components';

const MultiLineEllipsis = styled.div<{ line: number; lineHeight: string }>`
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  ${({ line, lineHeight }) => {
    return `
        -webkit-line-clamp: ${line || '1'};
        line-height: ${lineHeight || '13px'};
      `;
  }};
`;

export default memo(MultiLineEllipsis);
