import styled from 'styled-components';
import colors from 'styles/colorLib';

export default function Logos() {
  return (
    <Wrapper>
      <Logo>sigmate</Logo>
      <Description>
        {
          'Maximize your NFT investment in sigmate.\r\nVarious features provided by Sigmate Maximize your NFT investment in sigmate.'
        }
      </Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const Logo = styled.p`
  margin: 0 0 15px 0;
  color: ${colors.logoColor};
  font-size: 50px;
  font-weight: 500;
  font-family: 'Claris Sans', sans-serif;
`;

const Description = styled.p`
  margin: 0;
  color: ${colors.textColor};
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  text-align: center;
  white-space: pre-wrap;
`;
