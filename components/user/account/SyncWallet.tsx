import { MouseEventHandler, useCallback } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { SectionWrapper, BasicWrapper } from 'components/global';
import { WalletBtn } from 'components/user/account';
import styles from 'styles/styleLib';

export default function UserPage() {
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    if (e.currentTarget.name === 'Metamask') {
      // eslint-disable-next-line no-alert
      alert('Connect metamask wallet');
    }
  }, []);

  return (
    <BasicWrapper>
      <SectionWrapper header="Sync Wallets" marginBottom="10px">
        <Description>
          {
            'Connect your wallet to receive tokens as a reward for\r\nyour contribution to our community. '
          }
          <Link href="https://naver.com">
            <a>Learn more</a>
          </Link>
        </Description>
        <ButtonWrapper>
          <WalletBtn name="Metamask" onClick={onClick} />
          <WalletBtn name="ComingSoon" onClick={onClick} />
        </ButtonWrapper>
      </SectionWrapper>
    </BasicWrapper>
  );
}

const Description = styled.p`
  max-width: 500px;
  height: 37px;
  margin: 0 0 15px 0;
  color: ${styles.colors.textColor};
  font-size: 14px;
  white-space: pre-wrap;

  a {
    color: ${styles.colors.emphColor};
    font-size: 14px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
