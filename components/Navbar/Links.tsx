import Link from 'next/link';
import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import styles from 'styles/styleLib';

type PropsType = {
  onClickShowMenu: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

export default memo(function Links({ onClickShowMenu }: PropsType) {
  return (
    <LinksWrapper>
      <li>
        <Link href="/main/recent-edits">
          <a onClick={onClickShowMenu}>Recent Edits</a>
        </Link>
      </li>
      <li>
        <Link href="/main/forum">
          <a onClick={onClickShowMenu}>Forum</a>
        </Link>
      </li>
      <li>
        {/*
        <Link href="/main/upcoming">
          <a onClick={onClickShowMenu}>Upcoming</a>
        </Link>
        */}
        <a>Upcoming</a>
      </li>
      <li>
        <Link href="/main/leaderboard">
          <a onClick={onClickShowMenu}>Leaderboard</a>
        </Link>
      </li>
      {/*
      <li>
        <a>Event</a>
      </li>
      */}
    </LinksWrapper>
  );
});

const LinksWrapper = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0;

  @media (max-width: 1280px) {
    flex-direction: column;
    align-items: flex-start;
    width: 250px;
    height: calc(100vh - 90px);

    li {
      margin: 0 !important;

      :not(:first-child) {
        margin-top: 8px !important;
      }
    }
  }

  li {
    list-style-type: none;
    margin-left: 60px;
  }

  a {
    color: ${styles.colors.dimTextColor};
    font-size: 18px;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    white-space: nowrap;
    line-height: 160%;

    :hover {
      color: ${darken(0.1, styles.colors.dimTextColor)};
    }

    :active {
      color: ${darken(0.2, styles.colors.dimTextColor)};
    }
  }
`;
