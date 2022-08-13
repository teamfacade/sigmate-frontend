import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import type { MintingType } from 'containers/user/calendar/CalendarModal';
import { ImageWrapper } from 'components/global';
import UserImageEx from 'public/Icons/user/account/UserImageEx.png';
import styles from 'styles/styleLib';

type PropsType = {
  mint?: MintingType;
};

export default memo(function MintDetail({ mint }: PropsType) {
  if (mint === undefined) {
    return <div>Something went wrong</div>;
  } return (
      <Wrapper>
        <ImageWrapper width="680px" height="450px">
          <Image src={UserImageEx} alt={`${mint.name} Image`} layout="fill" />
        </ImageWrapper>
        <Descriptions>
          <FlexWrapper>
            <Name>Minting Time / Date</Name>
            <Content>{mint.date}</Content>
          </FlexWrapper>
          <FlexWrapper>
            <Name>Minting Price</Name>
            <Content>{mint.price}</Content>
          </FlexWrapper>
          <BtnWrapper>
            <LinkBtn mintPage={false}>
              <Link href={mint.wikiPage || 'https://namu.wiki'}>
                <a>Wiki Page</a>
              </Link>
            </LinkBtn>
            <LinkBtn mintPage>
              <Link href={mint.mintPage || 'https://opensea.io'}>
                <a>Minting Page</a>
              </Link>
            </LinkBtn>
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
  justify-content: end;
  margin-top: 31px;
`;

const LinkBtn = styled.button<{ mintPage: boolean }>`
  width: ${({ mintPage }) => (mintPage ? '153px' : '137px')};
  height: 32px;
  padding: 6px ${({ mintPage }) => (mintPage ? '29px' : '32px')} 7px;
  border-radius: 8px;
  border: 1px solid ${styles.colors.emphColor};
  background-color: ${({ mintPage }) =>
    mintPage ? styles.colors.emphColor : 'transparent'};
  color: ${({ mintPage }) => (mintPage ? '#FFFFFF' : styles.colors.emphColor)};
  font-size: 15px;
  white-space: nowrap;

  & + & {
    margin-left: 7px;
  }
`;
