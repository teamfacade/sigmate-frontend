import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  author: string;
  text: string;
};

export default memo(function CommentContent({ author, text }: PropsType) {
  return (
    <ContentWrapper>
      <Author>{author}</Author>
      <Text>{text}</Text>
    </ContentWrapper>
  );
});

const ContentWrapper = styled.div``;

const Author = styled.p`
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
