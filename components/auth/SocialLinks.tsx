import { SocialLinkBtn, SocialLinkWrapper } from '../global';

export default function SocialLinks() {
  return (
    <SocialLinkWrapper btnWidth="48px" btnHeight="48px" marginLeft="15px">
      <SocialLinkBtn platform="Twitter" iconWidth="48px" />
      <SocialLinkBtn platform="Telegram" iconWidth="48px" />
      <SocialLinkBtn platform="Discord" iconWidth="48px" />
      <SocialLinkBtn platform="Medium" iconWidth="48px" />
    </SocialLinkWrapper>
  );
}
