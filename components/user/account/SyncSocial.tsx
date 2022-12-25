import { MouseEventHandler, useCallback } from 'react';
import styled from 'styled-components';
import { useAppSelector } from 'hooks/reduxStoreHooks';
import { BasicWrapper, SectionWrapper } from 'components/global';
import { SocialBtn } from 'components/user/account';
import styles from 'styles/styleLib';

export default function SyncSocial() {
  const { googleAccount, twitterHandle, discordAccount } = useAppSelector(
    ({ account }) => account
  );

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    if (e.currentTarget.name === 'Twitter') {
      // eslint-disable-next-line no-alert
      alert('Connect Twitter');
    } else if (e.currentTarget.name === 'Discord') {
      // eslint-disable-next-line no-alert
      alert('Disconnect Discord');
    } else {
      // eslint-disable-next-line no-alert
      alert('Continue with google');
    }
  }, []);

  return (
    <BasicWrapper>
      <SectionWrapper header="Sync Social Accounts" marginBottom="10px">
        <Description>
          {
            'Connect your social account to easily login with them and\r\n(optionally) display them in your public profile.'
          }
        </Description>
        <ButtonWrapper>
          <SocialBtn name="Twitter" connected={!!twitterHandle} />
          <SocialBtn name="Discord" connected={!!discordAccount} />
          <SocialBtn name="Google" connected={!!googleAccount} />
        </ButtonWrapper>
      </SectionWrapper>
    </BasicWrapper>
  );
}

const Description = styled.p`
  max-width: 500px;
  margin: 0 0 10px 0;
  color: ${styles.colors.textColor};
  font-size: 14px;
  white-space: pre-wrap;
  line-height: 160%;

  a {
    color: ${styles.colors.emphColor};
    font-size: 14px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
