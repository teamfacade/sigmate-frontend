import styled from 'styled-components';
import { Logos, SocialLinks } from '../../components/auth';

export default function LogoWithLinks() {
  return (
    <Wrapper>
      <Logos />
      <SocialLinkWrapper>
        <SocialLinks />
      </SocialLinkWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin: auto;
`;

const SocialLinkWrapper = styled.div`
  position: absolute;
  right: 77px;
  bottom: 77px;
`;
