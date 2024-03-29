import Link from 'next/link';
import styled from 'styled-components';
import styles, { BlueBtnStyle } from 'styles/styleLib';
import { MouseEventHandler } from 'react';

type PropsType = {
  category: string;
  articleID: string;
  onClickDelete: MouseEventHandler<HTMLButtonElement>;
};

export default function ArticleManageBtns({
  category,
  articleID,
  onClickDelete,
}: PropsType) {
  return (
    <ArticleManageBtnWrapper>
      <Link href={`/main/forum/${category}/new-post?id=${articleID}`}>
        <a>
          <EditBtn>Edit</EditBtn>
        </a>
      </Link>
      <DeleteBtn onClick={onClickDelete}>Delete</DeleteBtn>
    </ArticleManageBtnWrapper>
  );
}

const ArticleManageBtnWrapper = styled.div`
  display: flex;
  margin-left: 4px;
  background: #ffffff;

  button {
    width: 95px;
    font-size: 15px;
    font-weight: 500;
    line-height: 160%;
    height: 33px;
  }

  a + button {
    margin-left: 8px;
  }
`;

const EditBtn = styled.button`
  ${BlueBtnStyle};
`;

const DeleteBtn = styled.button`
  ${BlueBtnStyle};
  background-color: ${styles.colors.lightThumbsUpColor};
  color: ${styles.colors.emphColor};
`;
