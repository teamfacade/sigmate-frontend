import { FormEventHandler, memo, MouseEventHandler } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { CommentInput } from 'components/main/forum/article';
import styles from 'styles/styleLib';

type PropsType = {
  author: string;
  text: string;
  showCommentEdit: boolean;
  articleID?: number;
  commentID?: number;
  onClickSubmit?: MouseEventHandler<HTMLButtonElement>;
  onSubmitComment?: FormEventHandler<HTMLFormElement>;
};

export default memo(function CommentContent({
  author,
  text,
  showCommentEdit,
  articleID = -1,
  commentID = -1,
  onClickSubmit,
  onSubmitComment,
}: PropsType) {
  return (
    <ContentWrapper>
      <Link href={`/main/profile/${author}`}>
        <Author>{author}</Author>
      </Link>
      {!showCommentEdit && <Text>{text}</Text>}
      <div style={{ display: `${showCommentEdit ? 'initial' : 'none'}` }}>
        <CommentInput
          articleID={articleID}
          commentID={commentID}
          onClickSubmit={onClickSubmit}
          onSubmitComment={onSubmitComment}
        />
      </div>
    </ContentWrapper>
  );
});

const ContentWrapper = styled.div``;

const Author = styled.a`
  margin: 0;
  color: ${styles.colors.logColor};
  font-size: 18px;
  font-weight: 900;
  line-height: 160%;
`;

const Text = styled.p`
  margin: 0;
  color: ${styles.colors.logColor};
  font-size: 14px;
  font-weight: 300;
  line-height: 160%;
`;
