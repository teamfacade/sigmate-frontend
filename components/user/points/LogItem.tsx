import { useMemo, memo } from 'react';
import styled from 'styled-components';
import convertDate from 'hooks/convertDate';
import styles from 'styles/styleLib';

type PropsType = {
  timestamp: number;
  source: string;
  amount: string;
};

export default memo(function LogItem({ timestamp, source, amount }: PropsType) {
  const time = useMemo(
    () => convertDate(new Date(timestamp), 'log', undefined),
    [timestamp]
  );

  return (
    <tbody>
      <Tr>
        <td>{time}</td>
        <td>{source}</td>
        <ColorfulTd
          positive={parseInt(amount, 10) > 0}
        >{`${amount} points`}</ColorfulTd>
      </Tr>
    </tbody>
  );
});

const Tr = styled.tr`
  background-color: #fafbfc;

  td:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  td:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    padding-right: 40px;
  }

  td p {
    margin: 0;
  }
`;

const ColorfulTd = memo(styled.td<{ positive: boolean }>`
  color: ${({ positive }) =>
    positive ? styles.colors.emphColor : '#FF276B'} !important;
`);
