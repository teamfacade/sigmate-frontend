import Link from 'next/link';
import styled from 'styled-components';
import styles, { BlueBtnStyle } from 'styles/styleLib';

type PropsType = {
  signedIn: boolean;
};

export default function BlurDiv({ signedIn }: PropsType) {
  return (
    <Background>
      <Text>{`${
        signedIn ? 'Complete sign in process ' : 'Create a Sigmate Account '
      }to continue`}</Text>
      <Link href="/auth" passHref>
        <a>
          <SignUpBtn>Sign up</SignUpBtn>
        </a>
      </Link>
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
  border-radius: 8px;
  backdrop-filter: blur(10px);
  z-index: 3;
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
