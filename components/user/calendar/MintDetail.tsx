import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import convertDate from 'lib/global/convertDate';
import UserImageEx from 'public/Icons/user/account/UserImageEx.png';
import styles from 'styles/styleLib';
import SocialLink from './SocialLink';

type PropsType = {
  mint?: Minting.ScheduleType;
};

// @ts-ignore
const loaderProp = ({ src }) => {
  return src;
};

export default memo(function MintDetail({ mint }: PropsType) {
  if (mint === undefined) {
    return <div>Something went wrong</div>;
  }
  return (
    <Wrapper>
      <ImageWrapper width="680px" height="415px">
        <Image
          loader={loaderProp}
          src={mint.collection.imageUrl || UserImageEx}
          alt={`${mint.name} Image`}
          layout="fill"
        />
      </ImageWrapper>
      <Descriptions>
        <FlexWrapper>
          <Name>Minting Time / Date (UTC)</Name>
          <Content>
            {convertDate(new Date(mint.mintingTime), 'time', ' ')}
          </Content>
        </FlexWrapper>
        <FlexWrapper>
          <Name>Minting Price</Name>
          <Content>
            <span>{mint.mintingPrice || 'TBA'}</span>
            {mint.mintingPrice && <span>{` ${mint.mintingPriceSymbol}`}</span>}
          </Content>
        </FlexWrapper>
        <BtnWrapper>
          <InnerBtnWrapper>
            {mint.collection.twitterHandle && (
              <SocialLink
                platform="Twitter"
                url={`https://www.twitter.com/${mint.collection.twitterHandle}`}
              />
            )}
            {mint.collection.telegramUrl && (
              <SocialLink
                platform="Telegram"
                url={mint.collection.telegramUrl}
              />
            )}
            {mint.collection.discordUrl && (
              <SocialLink platform="Discord" url={mint.collection.discordUrl} />
            )}
          </InnerBtnWrapper>
          <InnerBtnWrapper>
            <Link href={`/main/wiki/${mint.collection.document.id}`}>
              <LinkBtn mintPage={false}>Wiki Page</LinkBtn>
            </Link>
            <a href={mint.mintingUrl || 'https://opensea.io'}>
              <LinkBtn mintPage>Minting Page</LinkBtn>
            </a>
          </InnerBtnWrapper>
        </BtnWrapper>
      </Descriptions>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 680px;
  z-index: 10;
`;

const Descriptions = styled.div`
  width: 680px;
  padding: 20px;
  background-color: #ffffff;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const Content = styled.div`
  margin: 0;
  font-size: 20px;
  color: ${styles.colors.boldTextColor};
`;

const Name = styled(Content)`
  font-weight: bold;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 31px;
`;

const InnerBtnWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  a {
    margin-left: 7px;
  }
`;

const LinkBtn = styled.button<{ mintPage: boolean }>`
  width: ${({ mintPage }) => (mintPage ? '153px' : '137px')};
  height: 32px;
  padding: 6px ${({ mintPage }) => (mintPage ? '29px' : '32px')} 7px;
  border-radius: 8px;
  border: 1px solid ${styles.colors.emphColor};
  background-color: ${({ mintPage }) =>
    mintPage ? styles.colors.emphColor : 'transparent'};
  font-size: 15px;
  white-space: nowrap;
  color: ${({ mintPage }) => (mintPage ? '#FFFFFF' : styles.colors.emphColor)};

  & + & {
    margin-left: 7px;
  }
`;
