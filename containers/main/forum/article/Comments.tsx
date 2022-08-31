import { memo, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Comment } from 'components/main/forum/article';
import styles from 'styles/styleLib';

const ExComment: ForumCommentType = {
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

const Excomments: ForumCommentType[] = [
  ExComment,
  { ...ExComment, id: 2 },
  { ...ExComment, id: 3 },
  { ...ExComment, id: 4 },
  { ...ExComment, id: 5 },
];

type PropsType = {
  setShowModal: Dispatch<SetStateAction<Forum.ReportType>>;
};

export default memo(function Comments({ setShowModal }: PropsType) {
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
          setShowModal={setShowModal}
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
