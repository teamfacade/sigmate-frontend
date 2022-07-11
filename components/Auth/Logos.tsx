import styled from 'styled-components';

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
  margin: 0;
  color: var(--logo-color);
  font-size: 50px;
  font-weight: 900;
`;

const Description = styled.p`
  margin: 0;
  color: var(--text-color);
  font-size: 16px;
  white-space: pre-wrap;
  text-align: center;
`;
