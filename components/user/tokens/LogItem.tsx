import styled from 'styled-components';
import Amount, { AmountType } from './Amount';

type PropsType = {
  timestamp: number;
  source: string;
  myAddress: string;
  srcAddress: string;
  amount: AmountType;
  cost: {
    purpose: string;
    amount: string;
  };
};

export default function LogItem({
  timestamp,
  source,
  myAddress,
  srcAddress,
  amount,
  cost,
}: PropsType) {
  const date = new Date(timestamp);

  return (
    <ItemWrapperTr>
      <td>
        <MultilineWrapper>
          <p>{`${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</p>
          <p>{myAddress}</p>
        </MultilineWrapper>
      </td>
      <td>
        <MultilineWrapper>
          <p>{source}</p>
          <p>{srcAddress}</p>
        </MultilineWrapper>
      </td>
      <td>
        <Amount
          crypto={amount.crypto}
          quantity={amount.quantity}
          ticker={amount.ticker}
        />
      </td>
      <td>
        <CostWrapper>
          <p>{cost.purpose}</p>
          <p>{cost.amount}</p>
        </CostWrapper>
      </td>
    </ItemWrapperTr>
  );
}

const ItemWrapperTr = styled.tr`
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

const MultilineWrapper = styled.div`
  p + p {
    margin-top: 5px;
  }
`;

const CostWrapper = styled.div`
  p {
    display: inline-block;
    margin: 0;
  }

  p + p {
    margin: 0 0 0 30px;
  }
`;
