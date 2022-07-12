import styled from 'styled-components';
import { Logos, SocialLinks } from '.';

export default function LogoWithLinks() {
  return (
    <Wrapper>
      <Logos />
      <SocialLinks />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
`;
