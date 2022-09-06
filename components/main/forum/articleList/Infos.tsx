import { memo, ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import convertDate from 'lib/global/convertDate';
import styles from 'styles/styleLib';

type PropsType = {
  author: string;
  tags: any[];
  timestamp: string;
  children?: ReactNode;
  isAuthor?: boolean;
};

export default memo(function Infos({
  author,
  tags,
  timestamp,
  children,
  isAuthor = false,
}: PropsType) {
  return (
    <Wrapper>
      <Link href={`/main/profile/${author}`} passHref>
        <Author>{author}</Author>
      </Link>
      <TextWrapper isAuthor={isAuthor}>
        {tags.slice(0, 5).map((tag) => (
          <Text key={tag}>{`#${tag}`}</Text>
        ))}
        {tags.length > 5 && <Text>...</Text>}
        <Text>{convertDate(new Date(timestamp), 'MonthDDYYYY', '. ')}</Text>
      </TextWrapper>
      {children}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  padding: 20px;
  border-bottom: 1px solid ${styles.colors.dividerColor};
`;

const Author = styled.a`
  padding: 4px 16px;
  margin: 0 15px 0 0;
  border-radius: 8px;
  background-color: ${styles.colors.emptyColor};
  color: ${styles.colors.forumSubTextColor};
  font-size: 16px;
  font-weight: 700;
  line-height: 160%;
`;

const TextWrapper = styled.div<{ isAuthor: boolean }>`
  width: calc(100% - 320px);
  overflow: auto;

  p {
    display: inline;
    white-space: nowrap;
  }
`;

const Text = styled.p`
  width: fit-content;
  margin-right: 4px;
  color: ${styles.colors.forumSubTextColor};
  font-size: 15px;
  font-weight: 500;
  line-height: 140%;
`;
