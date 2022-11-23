import styled from 'styled-components';
import { SNSBtn } from '.';

export default function SocialLinks() {
  return (
    <Wrapper>
      <LinkWrapper>
        <a
          href="https://twitter.com/OfficialSigmate"
          target="_blank"
          rel="noreferrer"
        >
          <SNSBtn platform="Twitter" />
        </a>
        <a href="https://t.me/sigmateproject" target="_blank" rel="noreferrer">
          <SNSBtn platform="Telegram" />
        </a>
        <a
          href="https://discord.gg/DaEsBQh3dh"
          target="_blank"
          rel="noreferrer"
        >
          <SNSBtn platform="Discord" />
        </a>
        <a
          href="https://medium.com/@officialsigmate"
          target="_blank"
          rel="noreferrer"
        >
          <SNSBtn platform="Medium" />
        </a>
      </LinkWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const LinkWrapper = styled.div`
  display: flex;
  overflow-x: auto;

  button {
    position: relative;
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  a + a {
    margin-left: 15px;
  }
`;
