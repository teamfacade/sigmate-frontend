import styled from 'styled-components';
import { Logos, SocialLinks } from '../../components/auth';

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
  min-width: 250px;
  width: 30vw;

  @media (max-width: 640px) {
    margin-top: 50px;
  }
`;
