import { memo, MouseEventHandler, FormEventHandler } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { UtilBtns, CommentInput } from 'components/main/forum/article';
import styles from 'styles/styleLib';

type PropsType = {
  id: number;
  category: string;
  title: string;
  content: string;
  imageUrls: string[];
  tags: any[];
  commentCount: number;
  onSubmitComment: FormEventHandler<HTMLFormElement>;
  onClickReport: MouseEventHandler<HTMLButtonElement>;
  isAuthor?: boolean;
};

export default memo(function Content({
  id,
  title,
  content,
  imageUrls,
  tags,
  commentCount,
  onSubmitComment,
  onClickReport,
  isAuthor = false,
}: PropsType) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <MainContentWrapper>
        <MainText>
          {imageUrls[0] && (
            <Outer width="350px" height="365px">
              <Inner>
                <Image src={imageUrls[0]} alt="Thumbnail" layout="fill" />
              </Inner>
            </Outer>
          )}
          {content}
          <TagWrapper isAuthor={isAuthor}>
            {tags.slice(0, 5).map((tag) => (
              <Tag key={tag}>{`#${tag}`}</Tag>
            ))}
            {tags.length > 5 && <Tag>...</Tag>}
          </TagWrapper>
        </MainText>
      </MainContentWrapper>
      <UtilBtns commentCount={commentCount} onClickReport={onClickReport} />
      <CommentInput articleID={id} onSubmitComment={onSubmitComment} />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: fit-content;
  padding: 20px;
`;

const Outer = styled.span<{ width: string; height: string }>`
  display: inline-block;
  flex-shrink: 0;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-right: 16px;
  float: left;
`;

const Inner = styled.div`
  position: relative;
  max-width: 100%;
  height: 100%;
`;

const Title = styled.p`
  margin: 0 0 12px 0;
  color: ${styles.colors.headerColor};
  font-size: 20px;
  font-weight: 900;
`;

const MainContentWrapper = styled.div`
  margin-bottom: 15px;
`;

const MainText = styled.span`
  color: ${styles.colors.logColor};
  font-size: 14px;
  font-weight: 500;
  line-height: 160%;
  white-space: pre-line;
  word-break: break-all;
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
