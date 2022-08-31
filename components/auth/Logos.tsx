import styled from 'styled-components';
import styles from 'styles/styleLib';
import { CostNBnfit } from 'public/Icons/auth';

export default function Logos() {
  return (
    <Wrapper>
      <CostNBnfit />
      <Logo>Sigmate</Logo>
      <Description>
        {'Maximize your\r\nNFT investment with Sigmate.'}
      </Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.p`
  margin: 0 0 15px 0;
  color: ${styles.colors.logoColor};
  font-size: 50px;
  font-weight: 500;
  font-family: 'Claris Sans', sans-serif;
`;

const Description = styled.p`
  max-width: 284px;
  margin: 0;
  color: ${styles.colors.textColor};
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  text-align: center;
  white-space: pre-wrap;
`;
