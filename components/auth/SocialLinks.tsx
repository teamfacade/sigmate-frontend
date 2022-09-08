import Link from 'next/link';
import styled from 'styled-components';
import { SNSBtn } from '.';

export default function SocialLinks() {
  return (
    <Wrapper>
      <LinkWrapper>
        <Link href="https://twitter.com/OfficialSigmate">
          <a>
            <SNSBtn platform="Twitter" />
          </a>
        </Link>
        <Link href="https://t.me/officialsigmate">
          <a>
            <SNSBtn platform="Telegram" />
          </a>
        </Link>
        <Link href="https://discord.gg/DaEsBQh3dh">
          <a>
            <SNSBtn platform="Discord" />
          </a>
        </Link>
        <Link href="https://medium.com/@sigmateofficial">
          <a>
            <SNSBtn platform="Medium" />
          </a>
        </Link>
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
