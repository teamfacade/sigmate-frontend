import { memo } from 'react';
import styled from 'styled-components';
import { LogItem, LogHead } from 'components/user/tokens';
import styles from 'styles/styleLib';

/* @todo 필요한 정보들을 알맞은 형식으로 서버에서 받아와야함 */
export default memo(function LogItems() {
  return (
    <LogItemsWrapper>
      <thead>
        <LogHead />
      </thead>
      <tbody>
        <LogItem
          timestamp={1658301199005}
          source="Claim"
          myAddress="0xa419..c1a4"
          srcAddress="0xa419..c1a4"
          amount={{ crypto: 'Etherium', quantity: '+8,333.33', ticker: 'CNG' }}
          cost={{ purpose: 'GasFee', amount: '0.0060ETH($17.83)' }}
        />
        <LogItem
          timestamp={1658301199005}
          source="Claim"
          myAddress="0xa419..c1a4"
          srcAddress="0xa419..c1a4"
          amount={{ crypto: 'Etherium', quantity: '+8,333.33', ticker: 'CNG' }}
          cost={{ purpose: 'GasFee', amount: '0.0060ETH($17.83)' }}
        />
        <LogItem
          timestamp={1658301199005}
          source="Claim"
          myAddress="0xa419..c1a4"
          srcAddress="0xa419..c1a4"
          amount={{ crypto: 'Etherium', quantity: '+8,333.33', ticker: 'CNG' }}
          cost={{ purpose: 'GasFee', amount: '0.0060ETH($17.83)' }}
        />
      </tbody>
    </LogItemsWrapper>
  );
});

const LogItemsWrapper = styled.table`
  border-spacing: 0 10px;

  td {
    padding: 10px 0 10px 5vw;
    color: ${styles.colors.logColor};
    font-size: 15px;
  }

  td:last-child {
  }
  padding-right: 5vw;
`;
