import { memo } from 'react';
import styled from 'styled-components';
import convertDate from 'hooks/convertDate';
import styles from 'styles/styleLib';

type PropsType = {
  author: string;
  tags: string[];
  timestamp: string;
};

export default memo(function Infos({ author, tags, timestamp }: PropsType) {
  return (
    <Wrapper>
      <Author>{author}</Author>
      {tags.slice(0, 5).map((tag) => (
        <Text key={tag}>{`#${tag}`}</Text>
      ))}
      {tags.length > 5 && <Text>...</Text>}
      <Text>{convertDate(new Date(timestamp), 'MonthDDYYYY', '. ')}</Text>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 1000px;
  height: 60px;
  padding: 20px;
  border-bottom: 1px solid ${styles.colors.dividerColor};
`;

const Author = styled.p`
  padding: 4px 16px;
  margin: 0 15px 0 0;
  border-radius: 8px;
  background-color: ${styles.colors.emptyColor};
  color: ${styles.colors.forumSubTextColor};
  font-size: 16px;
  font-weight: 700;
  line-height: 160%;
`;

const Text = styled.p`
  width: fit-content;
  margin-right: 4px;
  color: ${styles.colors.forumSubTextColor};
  font-size: 15px;
  font-weight: 500;
  line-height: 140%;
`;
