import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import {
  CommentDownVote,
  CommentUpVote,
} from '../../../../public/Icons/main/forum';

type PropsType = {
  length: number;
  recommend: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isReply?: boolean;
};

export default memo(function CommentBtns({
  length,
  recommend,
  onClick,
  isReply,
}: PropsType) {
  return (
    <BtnWrapper>
      {!isReply && <ReplyBtn onClick={onClick}>{`reply ${length}`}</ReplyBtn>}
      <VoteBtn>
        <div>
          <button type="button">
            <CommentUpVote />
          </button>
          <p>{recommend}</p>
          <button type="button">
            <CommentDownVote />
          </button>
        </div>
      </VoteBtn>
    </BtnWrapper>
  );
});

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  > button {
    width: 88px;
    height: 28px;
    border-radius: 8px;
    line-height: 160%;
    font-family: 'Inter', sans-serif;
  }
`;

const ReplyBtn = styled.button`
  padding: 2px 14px;
  margin-right: 5px;
  color: #ffffff;
  border: none;
  background-color: ${styles.colors.emphColor};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
`;

const VoteBtn = styled.button`
  padding: 2px 15px;
  color: ${styles.colors.logColor};
  border: 1px solid #ececec;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: 700;

  div {
    display: inline-flex;
    align-items: center;

    button {
      position: relative;
      top: 1px;
      padding: 0;
      margin: 0;
      border: none;
      background-color: transparent;
      cursor: pointer;
    }

    p {
      margin: 0 3px;
    }
  }
`;
