import { useCallback, MouseEventHandler } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { OAuthBtn } from 'components/auth';

export default function AuthComponents() {
  // @todo OAuth 기능 구현
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    switch (e.currentTarget.name) {
      case 'Google':
        // eslint-disable-next-line no-alert
        alert('Google Login');
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
    <Wrapper>
      <div>
        <Header>Log in / sign up</Header>
        <BtnWrapper>
          <span>
            <OAuthBtn service="Google" onClick={onClick} />
            <OAuthBtn service="Metamask" onClick={onClick} />
          </span>
        </BtnWrapper>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 2 2 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

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
