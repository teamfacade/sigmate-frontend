import { memo } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import styles from 'styles/styleLib';

type PropsType = {
  event: string;
  imageUrl: string;
};

export default memo(function ScheduleThumbnail({ event, imageUrl }: PropsType) {
  if (imageUrl)
    return (
      <ImageWrapper width="100%" height="150px">
        <Image src={imageUrl} alt={`${event} thumbnail`} layout="fill" />
      </ImageWrapper>
    );
  return <NoImage />;
});

const NoImage = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${styles.colors.emptyColor};
`;
