import styled from 'styled-components';
import colors from 'styles/colorLib';
import { SNSBtn } from '.';

export default function SocialLinks() {
  return (
    <Wrapper>
      <Subheader>Social Links</Subheader>
      <LinkWrapper>
        <SNSBtn platform="Twitter" />
        <SNSBtn platform="Telegram" />
        <SNSBtn platform="Discord" />
        <SNSBtn platform="Medium" />
      </LinkWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 50px;
`;

const Subheader = styled.p`
  margin: 0 0 10px 0;
  color: ${colors.textColor};
  font-size: 18px;
  font-weight: 500;
`;

const LinkWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;

  button {
    position: relative;
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 8px;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  button + button {
    margin-left: 15px;
  }
`;