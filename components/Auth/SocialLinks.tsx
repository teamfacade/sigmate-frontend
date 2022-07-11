import styled from 'styled-components';
import { DownloadBtn, SNSBtn } from '.';

export default function SocialLinks() {
  return (
    <Wrapper>
      <Subheader>Social Links</Subheader>
      <LinkWrapper>
        <DownloadBtn platform="Apple" />
        <DownloadBtn platform="Google" />
        <SNSBtn platform="twitter" />
        <SNSBtn platform="Discord" />
      </LinkWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Subheader = styled.p`
  color: var(--text-color);
  font-size: 18px;
  font-weight: 500;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
