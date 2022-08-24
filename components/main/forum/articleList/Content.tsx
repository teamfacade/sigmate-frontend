import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import styles from 'styles/styleLib';

type PropsType = {
  id: number;
  category: string;
  title: string;
  content: string;
  imageURL: string;
};

export default memo(function Content({
  id,
  category,
  title,
  content,
  imageURL,
}: PropsType) {
  return (
    <Link href={`/main/forum/${category}/${id}`}>
      <a>
        <Wrapper>
          <TextWrapper>
            <Title>{title}</Title>
            <EllipsisContent>{`${content.slice(0, 650)}${
              content.length > 650 && '...'
            }`}</EllipsisContent>
          </TextWrapper>
          {imageURL && (
            <ImageWrapper width="350px" height="365px">
              <Image src={imageURL} alt="Thumbnail" />
            </ImageWrapper>
          )}
        </Wrapper>
      </a>
    </Link>
  );
});

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  width: 1000px;
  height: fit-content;
  padding: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 580px;
  margin-right: 20px;
`;

const Title = styled.p`
  margin: 0 0 12px 0;
  color: ${styles.colors.headerColor};
  font-size: 20px;
  font-weight: 900;
`;

const EllipsisContent = styled.span`
  color: ${styles.colors.logColor};
  font-size: 14px;
  font-weight: 500;
  line-height: 160%;
`;
