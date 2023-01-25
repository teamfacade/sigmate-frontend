import styled from 'styled-components';
import {
  TwitterUrl,
  DiscordUrl,
  TelegramUrl,
  MediumUrl,
} from 'lib/global/ExternalLinks';
import {
  TwitterBlack,
  DiscordBlack,
  TelegramBlack,
  MediumBlack,
} from 'public/Icons/landingPage';

export default function BlackSocialLinks() {
  return (
    <Wrapper>
      <a href={TwitterUrl}>
        <TwitterBlack />
      </a>
      <a href={DiscordUrl}>
        <DiscordBlack />
      </a>
      <a href={TelegramUrl}>
        <TelegramBlack />
      </a>
      <a href={MediumUrl}>
        <MediumBlack />
      </a>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;

  a:not(:first-child) {
    border-left: 1px solid #353633;
  }
`;
