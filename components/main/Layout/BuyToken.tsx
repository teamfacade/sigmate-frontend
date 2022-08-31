import { memo } from 'react';
import styled from 'styled-components';
import { coins as Coins } from 'public/Icons';
import styles from 'styles/styleLib';

export default memo(function BuyToken() {
  return (
    <Wrapper>
      <div style={{ padding: '20px' }}>
        <Header>Buy Token!</Header>
        <Description>{'Maximize your\r\n NFT investment'}</Description>
      </div>
      <Coins />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 159px;
  margin: 20px 0 0 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: ${styles.shadows.containerShadow};

  svg {
    position: relative;
    top: -2px;
    right: -3px;
  }
`;

const Header = styled.h2`
  margin: 0;
  padding-bottom: 20px;
  color: ${styles.colors.headerColor};
  font-size: 16px;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
`;

const Description = styled.p`
  margin: 0;
  color: #606060;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  white-space: pre;
`;
