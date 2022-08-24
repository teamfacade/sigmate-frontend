import { memo } from 'react';
import styled from 'styled-components';
import { Comment } from 'components/main/forum/article';
import styles from 'styles/styleLib';

export type CommentType = {
  id: number;
  PFPUrl: string;
  author: string;
  text: string;
  replies: CommentType[];
  recommend: number;
};

const ExComment: CommentType = {
  id: 1,
  PFPUrl: '',
  author: 'Puvilla',
  text: 'Contrary to popular belief, Lorem Ipsu Contrary to',
  replies: [
    {
      id: 1,
      PFPUrl: '',
      author: 'Puvilla',
      text: 'Contrary to popular belief, Lorem Ipsu Contrary to',
      replies: [],
      recommend: 232,
    },
    {
      id: 2,
      PFPUrl: '',
      author: 'Puvilla',
      text: 'Contrary to popular belief, Lorem Ipsu Contrary to',
      replies: [],
      recommend: 232,
    },
    {
      id: 3,
      PFPUrl: '',
      author: 'Puvilla',
      text: 'Contrary to popular belief, Lorem Ipsu Contrary to',
      replies: [],
      recommend: 232,
    },
    {
      id: 4,
      PFPUrl: '',
      author: 'Puvilla',
      text: 'Contrary to popular belief, Lorem Ipsu Contrary to',
      replies: [],
      recommend: 232,
    },
    {
      id: 5,
      PFPUrl: '',
      author: 'Puvilla',
      text: 'Contrary to popular belief, Lorem Ipsu Contrary to',
      replies: [],
      recommend: 232,
    },
  ],
  recommend: 232,
};

const Excomments: CommentType[] = [
  ExComment,
  { ...ExComment, id: 2 },
  { ...ExComment, id: 3 },
  { ...ExComment, id: 4 },
  { ...ExComment, id: 5 },
];

export default memo(function Comments() {
  return (
    <Wrapper>
      {Excomments.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          PFPUrl={comment.PFPUrl}
          author={comment.author}
          text={comment.text}
          replies={comment.replies}
          recommend={comment.recommend}
          isReply={false}
        />
      ))}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 45px;
  margin: 20px 0 5px 0;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: ${styles.shadows.containerShadow};
  overflow: scroll;
`;
