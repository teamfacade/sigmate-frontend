import Link from 'next/link';
import { memo } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import styles from 'styles/styleLib';

export default memo(function Links() {
  return (
    <LinksWrapper>
      <li>
        <Link href="/main/RecentEdits">
          <a>Recent Edits</a>
        </Link>
      </li>
      <li>
        <Link href="/upcoming">
          <a>Upcoming</a>
        </Link>
      </li>
      <li>
        <Link href="/trending">
          <a>Stats / Trending</a>
        </Link>
      </li>
      <li>
        <Link href="/main/Draw">
          <a>Event / Draw</a>
        </Link>
      </li>
      <li>
        <Link href="/forum">
          <a>Forum</a>
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
      margin-left: 60px;
    }
  }

  a {
    color: ${styles.colors.linkColor};
    font-size: 16px;
    font-weight: bold;
    font-family: 'Inter', sans-serif;
    white-space: nowrap;

    :hover {
      color: ${darken(0.1, styles.colors.linkColor)};
    }

    :active {
      color: ${darken(0.2, styles.colors.linkColor)};
    }
  }
`;
