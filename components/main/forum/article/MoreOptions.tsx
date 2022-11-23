import { MouseEventHandler, useMemo } from 'react';
import styled from 'styled-components';
import { useAppSelector } from 'hooks/reduxStoreHooks';
import styles, { TransparentBtnStyle } from 'styles/styleLib';

type PropsType = {
  authorUserName: string;
  articleID: number;
  commentID: number;
  replyID?: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onClickReport: MouseEventHandler<HTMLButtonElement>;
  showOptions: boolean;
  showCommentEdit: boolean;
};

export default function MoreOptions({
  authorUserName,
  articleID,
  commentID,
  replyID,
  onClick,
  onClickReport,
  showOptions,
  showCommentEdit,
}: PropsType) {
  const { userName } = useAppSelector(({ account }) => account);

  const btnName = useMemo(() => {
    if (replyID) return 'reply';
    if (commentID) return 'comment';
    return 'article';
  }, [commentID, replyID]);

  return (
    <Wrapper>
      <TransparentBtn name="More" onClick={onClick}>
        &#8285;
      </TransparentBtn>
      {showOptions && (
        <>
          {userName === authorUserName && (
            <>
              <OptionBtn
                name="Edit"
                data-comment-id={commentID}
                data-reply-id={replyID}
                onClick={onClick}
              >
                {showCommentEdit ? 'Cancel' : 'Edit'}
              </OptionBtn>
              <OptionBtn
                name="Delete"
                data-comment-id={commentID}
                data-reply-id={replyID}
                onClick={onClick}
              >
                Delete
              </OptionBtn>
            </>
          )}
          {/*
          <OptionBtn
            name={btnName}
            data-article-id={articleID}
            data-comment-id={commentID}
            data-reply-id={replyID}
            onClick={onClickReport}
          >
            Report
          </OptionBtn>
          */}
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TransparentBtn = styled.button`
  ${TransparentBtnStyle};
  font-size: 16px;
  font-weight: 700;
  color: ${styles.colors.logColor};
`;

const OptionBtn = styled.button`
  width: 77px;
  padding: 2px 15px;
  color: ${styles.colors.logColor};
  border: 1px solid ${styles.colors.lightGrayBorderColor};
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  box-shadow: ${styles.shadows.containerShadow};

  & + & {
    margin-top: 4px;
  }
`;
