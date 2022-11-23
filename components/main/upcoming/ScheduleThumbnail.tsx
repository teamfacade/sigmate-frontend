import { memo } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import styles from 'styles/styleLib';

type PropsType = {
  name: string;
  imageUrl: string;
};

// @ts-ignore
const loaderProp = ({ src }) => {
  return src;
};

export default memo(function ScheduleThumbnail({ name, imageUrl }: PropsType) {
  if (imageUrl)
    return (
      <ImageWrapper width="100%" height="fit-content">
        <Image
          loader={loaderProp}
          src={imageUrl}
          alt={`${name} thumbnail`}
          width="100%"
          height="100%"
          layout="responsive"
        />
      </ImageWrapper>
    );
  return <NoImage />;
});

const NoImage = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${styles.colors.emptyColor};
`;
