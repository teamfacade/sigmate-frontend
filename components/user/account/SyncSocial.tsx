import { MouseEventHandler, useCallback } from 'react';
import styled from 'styled-components';
import { BasicWrapper, SectionWrapper } from 'components/global';
import { SocialBtn } from 'components/user/account';
import styles from 'styles/styleLib';

export default function SyncSocial() {
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    if (e.currentTarget.name === 'Twitter') {
      // eslint-disable-next-line no-alert
      alert('Connect Twitter');
    } else {
      // eslint-disable-next-line no-alert
      alert('Disconnect Discord');
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
          <SocialBtn name="Twitter" connected={false} onClick={onClick} />
          <SocialBtn name="Discord" connected onClick={onClick} />
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
`;
