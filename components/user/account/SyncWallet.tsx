import styled from 'styled-components';
import { SectionWrapper, BasicWrapper } from 'components/global';
import { Metamask as MetamaskIcon } from 'public/Icons/user/account';
import styles from 'styles/styleLib';
import { Description, ButtonWrapper } from './SyncBtnComponents';

export default function UserPage() {
  return (
    <BasicWrapper>
      <SectionWrapper header="Sync Wallets" marginBottom="10px">
        <Description>
          {
            "Sign in easily with your metamask wallet.\r\nDon't miss your rewards!"
          }
        </Description>
        <ButtonWrapper>
          <MetamaskBtn>
            <MetamaskIcon />
            <p>Metamask</p>
          </MetamaskBtn>
          <CommingSoon>{'More wallets\r\ncomming soon...'}</CommingSoon>
        </ButtonWrapper>
      </SectionWrapper>
    </BasicWrapper>
  );
}

const MetamaskBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;

  border-color: ${styles.colors.metamaskBorderColor};
  background-color: ${styles.colors.metamaskBackgroundColor};
  font-weight: bolder;
  color: ${styles.colors.metamaskNameColor};

  p {
    margin: 10px 0 0 0;
    text-align: center;
  }
`;

const CommingSoon = styled.button`
  border-color: #ebeef2;
  background-color: ${styles.colors.globalBackgroundColor};
  font-weight: normal;
  color: #98a2b2;

  p {
    margin: 0;
    text-align: center;
    white-space: pre;
  }
`;
