import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAppSelector } from 'hooks/reduxStoreHooks';
import { AuthComponents, AccSetup, LogoWithLinks } from 'containers/auth';
import { useMemo } from 'react';
import { store } from '../../store/store';

export default function AuthPage() {
  const signedIn = useAppSelector(({ auth }) => auth.signedIn);
  const { userName } = useAppSelector(({ account }) => account);
  const { metamaskWallet } = useMemo(
    () => (store.getState() as ReduxState.RootStateType).account,
    [signedIn]
  );
  const router = useRouter();

  if (signedIn && userName) {
    router.push('/main/wiki/Sigmate');
  }

  return (
    <div style={{ height: '100vh' }}>
      <Wrapper>
        <LeftWrapper>
          {signedIn && !userName ? (
            <AccSetup signedWithMetamask={!!metamaskWallet} />
          ) : (
            <AuthComponents signedIn={signedIn} />
          )}
        </LeftWrapper>
        <RightWrapper>
          <LogoWithLinks />
        </RightWrapper>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap-reverse;
  position: relative;
  height: 100%;

  @media (max-width: 640px) {
    display: inline-block;
    overflow: hidden;
  }
`;

const LeftWrapper = styled.div`
  flex: 2 2 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const RightWrapper = styled.div`
  min-width: 250px;
  width: 30vw;
  height: 100%;
  background-color: #ffffff;
  border-left: 2px solid #f0f0f0;
`;
