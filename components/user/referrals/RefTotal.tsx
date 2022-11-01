import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  total: number;
};

export default function RefTotal({ total }: PropsType) {
  return (
    <RefTotalWrapper>
      <P>
        Total confirmed <strong>{total}</strong>
      </P>
    </RefTotalWrapper>
  );
}

const RefTotalWrapper = memo(styled.div`
  position: absolute;
  top: 0;
  right: 0;
`);

const P = memo(styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: ${styles.colors.logColor};

  strong {
    font-weight: 700;
    color: ${styles.colors.emphColor};
  }
`);
