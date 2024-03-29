import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import styles from 'styles/styleLib';

type PropsType = {
  id: number;
  name: string;
  description: string;
  imageURL: string;
};

export default memo(function Category({
  id,
  name,
  description,
  imageURL,
}: PropsType) {
  return (
    <Link href={`/main/forum/${id}`}>
      <a>
        <Wrapper>
          <div style={{ boxShadow: 'rgb(228 228 228) 0px 1px 3px 0px' }}>
            {imageURL ? (
              <ImageWrapper width="100%" height="150px">
                <Image src={imageURL} alt={`${name} category thumbnail`} />
              </ImageWrapper>
            ) : (
              <NoImage />
            )}
          </div>
          <Name>{name}</Name>
          <Description>{description}</Description>
        </Wrapper>
      </a>
    </Link>
  );
});

const Wrapper = styled.div`
  width: 340px;
  height: 234px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: ${styles.shadows.containerShadow};
  overflow: hidden;
`;

const NoImage = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${styles.colors.emptyColor};
`;

const Name = styled.p`
  margin: 13px 21px 0;
  color: ${styles.colors.logoColor};
  font-size: 24px;
  font-weight: 900;
  line-height: 110%;
`;

const Description = styled.p`
  margin: 5px 21px 0;
  color: ${styles.colors.lighterTextColor};
  font-size: 16px;
  font-weight: 300;
  line-height: 140%;
`;
