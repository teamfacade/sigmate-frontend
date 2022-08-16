import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

const LogTable = memo(styled.table`
  border-spacing: 0 10px;

  thead {
    font-size: 15px;
    font-weight: bold;

    tr {
      background-color: transparent;
    }

    th {
      padding: 0 200px 0 0;
      color: ${styles.colors.dimTextColor};
      font-size: 15px;
      text-align: start;

      :first-child {
        padding-left: 40px;
      }
    }
  }

  tr {
    background-color: #fafbfc;

    td {
      padding: 10px 200px 10px 0;
      color: ${styles.colors.logColor};
      font-size: 15px;
      text-align: start;
      white-space: nowrap;

      :first-child {
        padding-left: 40px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }

      :last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        padding-right: 40px;
      }

      p {
        margin: 0;
      }
    }
  }
`);

export default LogTable;
