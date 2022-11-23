import { memo, MouseEventHandler } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import UserImageEx from 'public/Icons/user/account/UserImageEx.png';
import styles from 'styles/styleLib';

type PropsType = {
  name: string;
  category: string;
  thumbnailURL: string;
  onClick: MouseEventHandler<HTMLDivElement>;
};

// @ts-ignore
const loaderProp = ({ src }) => {
  return src;
};

export default memo(function MintingItem({
  name,
  category,
  thumbnailURL,
  onClick,
}: PropsType) {
  return (
    <Wrapper data-name={name} onClick={onClick}>
      <ImageWrapper width="327px" height="115px">
        <Image
          loader={loaderProp}
          src={thumbnailURL || UserImageEx}
          alt={`${name} Project Thumbnail`}
          objectFit="cover"
          layout="fill"
        />
      </ImageWrapper>
      <DescriptionWrapper>
        <Name>{name}</Name>
        <Publisher>{category}</Publisher>
      </DescriptionWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 327px;
  height: fit-content;
  border-radius: 8px;
  background-color: ${styles.colors.modalContentBgColor};
  overflow: hidden;
`;

const DescriptionWrapper = styled.div`
  padding: 0 16px 12px 16px;
`;

const Name = styled.p`
  height: 26px;
  margin: 12px 0 8px 0;
  color: ${styles.colors.logoColor};
  font-size: 24px;
  font-weight: bold;
`;

const Publisher = styled.p`
  height: 22px;
  margin: 0;
  color: ${styles.colors.lighterTextColor};
  font-size: 16px;
`;
