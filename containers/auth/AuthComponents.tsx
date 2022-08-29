import { useEffect, useCallback, MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { OAuthBtn } from 'components/auth';

export default function AuthComponents() {
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(router.query).length) {
      axios
        .post('http://localhost:5100/api/v1/auth/google', {
          code: router.query.code,
        })
        .finally(() =>
          window.history.replaceState({}, document.title, '/auth')
        );
    }
  }, [router]);

  // @todo OAuth 기능 구현
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    switch (e.currentTarget.name) {
      case 'Google':
        router.push('http://localhost:5100/oauth/google');
        break;
      case 'Metamask':
        // eslint-disable-next-line no-alert
        alert('Metamask Login');
        break;
      default:
        // eslint-disable-next-line no-alert
        alert('Comming soon');
    }
  }, []);

  return (
    <div>
      <Header>Log in / sign up</Header>
      <BtnWrapper>
        <span>
          <OAuthBtn service="Google" onClick={onClick} />
          <OAuthBtn service="Metamask" onClick={onClick} />
        </span>
      </BtnWrapper>
    </div>
  );
}

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.span`
  display: inline-block;
  margin-bottom: 25px;
  color: ${styles.colors.logoColor};
  font-size: 22px;
  font-weight: bold;
`;
