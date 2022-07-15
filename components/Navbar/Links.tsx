import Link from 'next/link';
import { memo } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import colors from 'styles/colorLib';

export default memo(function Links() {
  return (
    <LinksWrapper>
      <li>
        <Link href="/recentEdits">
          <a>Recent Edits</a>
        </Link>
      </li>
      <li>
        <Link href="/upcoming">
          <a>upcoming</a>
        </Link>
      </li>
      <li>
        <Link href="/trending">
          <a>STATS / trending</a>
        </Link>
      </li>
      <li>
        <Link href="/draw">
          <a>event / draw</a>
        </Link>
      </li>
      <li>
        <Link href="/forum">
          <a>forum</a>
        </Link>
      </li>
    </LinksWrapper>
  );
});

const LinksWrapper = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0;

  li {
    list-style-type: none;

    :not(:first-child) {
      margin-left: 40px;
    }
  }

  a {
    color: ${colors.linkColor};
    font-size: 16px;
    font-weight: bold;
    font-family: 'Inter', sans-serif;
    white-space: nowrap;

    :hover {
      color: ${darken(0.1, colors.linkColor)};
    }

    :active {
      color: ${darken(0.2, colors.linkColor)};
    }
  }
`;