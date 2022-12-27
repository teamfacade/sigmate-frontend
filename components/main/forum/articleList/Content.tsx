import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import styles from 'styles/styleLib';

type PropsType = {
  id: number;
  category: string;
  tags: any[];
  title: string;
  content: string;
  imageURL: string;
  isAuthor?: boolean;
};

export default memo(function Content({
  id,
  category,
  tags,
  title,
  content,
  imageURL,
  isAuthor = false,
}: PropsType) {
  return (
    <Link href={`/main/forum/${category}/${id}`}>
      <a>
        <Wrapper>
          <TextWrapper>
            <Title>{title}</Title>
            <EllipsisContent>{`${content.slice(0, 650)}${
              content.length > 650 ? '...' : ''
            }`}</EllipsisContent>
            <TagWrapper isAuthor={isAuthor}>
              {tags.slice(0, 5).map((tag) => (
                <Tag key={tag}>{`#${tag}`}</Tag>
              ))}
              {tags.length > 5 && <Tag>...</Tag>}
            </TagWrapper>
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
  height: fit-content;
  padding: 20px;
  overflow: hidden;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 260px;
  margin-right: 20px;
`;

const Tag = styled.p`
  margin-right: 4px;
  color: ${styles.colors.forumSubTextColor};
  font-size: 15px;
  font-weight: 500;
  line-height: 140%;
  white-space: pre;
`;

const TagWrapper = styled.div<{ isAuthor: boolean }>`
  flex: 1 1 calc(100% - 440px);
  margin: 12px 0 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  text-overflow-ellipsis: ${styles.colors.forumSubTextColor};

  p {
    display: inline;
    white-space: nowrap;
  }
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
  white-space: pre-line;
  word-break: break-all;
`;
