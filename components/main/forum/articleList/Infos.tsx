import { memo, ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import convertDate from 'lib/global/convertDate';
import styles from 'styles/styleLib';

type PropsType = {
  author: string;
  username: string;
  timestamp: string;
  children?: ReactNode;
};

export default memo(function Infos({
  author,
  username,
  timestamp,
  children,
}: PropsType) {
  return (
    <Wrapper>
      <InnerWrapper>
        <Link href={`/main/profile/${username}`} passHref>
          <Author>{author}</Author>
        </Link>
        <Text>{convertDate(new Date(timestamp), 'MonthDDYYYY', '. ')}</Text>
      </InnerWrapper>
      {children}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 20px;
  border-bottom: 1px solid ${styles.colors.dividerColor};
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
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
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled.p`
  margin: 0 4px 0 0;
  color: ${styles.colors.forumSubTextColor};
  font-size: 15px;
  font-weight: 500;
  line-height: 140%;
  white-space: pre;
`;
