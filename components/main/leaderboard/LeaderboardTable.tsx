import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

const responsiveHidding = `
      @media(max-width: 877px) {
            :nth-child(5) {
                  display: none;
            }
      }
      @media(max-width: 600px) {
        :nth-child(3), :nth-child(4) {
            display: none;
        }
      }   
`;

const gap = `
      :first-child {
        width: 80px;
        padding: 10px 16px 10px 16px;
      }
      :nth-child(2) {
        padding: 10px 1.48vw 10px 0;
      }
      :nth-child(3) {
        padding: 10px 1.3vw 10px 0;
      }
      :nth-child(4) {
        padding: 10px 1.22vw 10px 0;
      }
      :nth-child(5) {
        padding: 10px 1.6vw 10px 0;
      }
      :last-child {
        width: 120px;
        padding: 10px 32px 10px 0;
      }
`;

const LeaderboardTable = memo(styled.table`
  width: 100%;
  border-spacing: 0 10px;

  thead {
    font-size: 15px;
    font-weight: 600;

    tr {
      background-color: transparent;
    }

    th {
      ${gap};
      ${responsiveHidding};
      color: ${styles.colors.darkerTextColor};
      font-size: 15px;
      text-align: center;
    }
  }

  tr {
    background-color: ${styles.colors.tableRowColor};

    td {
      ${gap};
      ${responsiveHidding};
      color: ${styles.colors.darkerTextColor};
      font-size: 15px;
      text-align: center;
      word-break: break-all;

      :first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        line-height: 150%;
        letter-spacing: 0.1px;
      }

      :nth-child(2) {
        line-height: 140%;
      }

      :last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }

      p {
        margin: 0 auto;
      }
    }
  }
`);

export default LeaderboardTable;
