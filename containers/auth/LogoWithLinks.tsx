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
  height: 100%;
  background-color: #ffffff;
  border-left: 2px solid #f0f0f0;

  @media (max-width: 640px) {
    margin-top: 50px;
  }
`;
