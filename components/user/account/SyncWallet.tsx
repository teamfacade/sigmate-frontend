import { MouseEventHandler, useCallback } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { connectToMetaMask } from 'lib/global/connectMetamask';
import { useAppSelector, useAppDispatch } from 'hooks/reduxStoreHooks';
import { setMetamaskWallet } from 'store/modules/accountSlice';
import { SectionWrapper, BasicWrapper } from 'components/global';
import { WalletBtn } from 'components/user/account';
import styles from 'styles/styleLib';

export default function UserPage() {
  const dispatch = useAppDispatch();
  const { metamaskWallet } = useAppSelector(({ account }) => account);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (e.currentTarget.name === 'Metamask') {
        connectToMetaMask(dispatch).then((action) => {
          if (action.payload.status === 200)
            dispatch(setMetamaskWallet(action.payload.data.metamaskWallet));
        });
      }
    },
    [dispatch]
  );

  return (
    <BasicWrapper>
      <SectionWrapper header="Sync Wallets" marginBottom="10px">
        <Description>
          {
            'Connect your wallet to receive tokens as a reward for\r\nyour contribution to our community. '
          }
          <Link href="https://sigmate.gitbook.io/sigmate/sigmate/token-utility">
            <a>Learn more</a>
          </Link>
        </Description>
        <ButtonWrapper>
          <WalletBtn
            name="Metamask"
            onClick={onClick}
            disabled={!!metamaskWallet}
          />
          <WalletBtn name="ComingSoon" onClick={onClick} disabled />
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
