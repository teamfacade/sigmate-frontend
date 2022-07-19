import styled from 'styled-components';
import { BasicWrapper, SectionWrapper } from 'components/global';
import { Twitter, Discord } from 'public/Icons/user/account';
import colors from 'styles/colorLib';
import { Description, ButtonWrapper } from './SyncBtnComponents';

export default function SyncSocial() {
  return (
    <BasicWrapper>
      <SectionWrapper header="Sync Social Accounts" marginBottom="10px">
        <Description>
          {
            'Register your SNS accounts.\r\nYou can share your opinions with others.'
          }
        </Description>
        <ButtonWrapper>
          <TwitterBtn>
            <TwitterIcon />
            <div>
              <span>Connect</span>
              <span>Twitter</span>
            </div>
          </TwitterBtn>
          <DiscordBtn>
            <DiscordIcon />
            <div>
              <span>Connect</span>
              <span>Discord</span>
            </div>
          </DiscordBtn>
        </ButtonWrapper>
      </SectionWrapper>
    </BasicWrapper>
  );
}

const SocialBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    padding: 0 11px;
    margin-top: 10px;

    span {
      margin: 10px 0 0 0;
      text-align: center;
    }

    span + span {
      padding-left: 5px;
      font-weight: bolder;
    }
  }
`;

const TwitterIcon = styled(Twitter)`
  margin: 9px 0 11px 0;
`;

const TwitterBtn = styled(SocialBtn)`
  border-color: ${colors.twitterBorderColor};
  background-color: ${colors.twitterBackgroundColor};
  font-weight: normal;
  color: ${colors.twitterNameColor};
`;

const DiscordIcon = styled(Discord)`
  margin: 7px 0;
`;

const DiscordBtn = styled(SocialBtn)`
  border-color: ${colors.discordBorderColor};
  background-color: ${colors.discordBackgroundColor};
  font-weight: normal;
  color: ${colors.discordNameColor};
`;
