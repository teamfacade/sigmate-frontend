import Link from 'next/link';
import styled from 'styled-components';
import styles, { BlueBtnStyle } from 'styles/styleLib';

export default function BlurDiv() {
  return (
    <Background>
      <Text>Create a Sigmate Account to continue</Text>
      <SignUpBtn>
        <Link href="/auth">
          <a>Sign up</a>
        </Link>
      </SignUpBtn>
    </Background>
  );
}

const Background = styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 56px);
  backdrop-filter: blur(25px);
`;

const Text = styled.p`
  margin: 0 0 14px 0;
  color: ${styles.colors.logoColor}
  font-size: 23px;
  font-weight: 500;
  line-height: 160%;
`;

const SignUpBtn = styled.button`
  ${BlueBtnStyle};

  height: 60px !important;
  padding: 20px 200px;
  font-weight: 700;
`;
