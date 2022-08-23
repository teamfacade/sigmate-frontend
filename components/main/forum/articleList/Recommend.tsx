import { memo } from 'react';
import styled from 'styled-components';
import { UpVote, DownVote } from 'public/Icons/main/forum';
import styles from 'styles/styleLib';

type PropsType = {
  recommend: number;
};

export default memo(function Recommend({ recommend }: PropsType) {
  return (
    <Wrapper>
      <Btn>
        <UpVote />
      </Btn>
      <RecommendTotal>{recommend}</RecommendTotal>
      <Btn>
        <DownVote />
      </Btn>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 55px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-right: 1px solid ${styles.colors.dividerColor};
`;

const Btn = styled.button`
  border: none;
  background-color: transparent;

  svg {
    path {
      fill: ${styles.colors.forumSubTextColor};
    }
  }
`;

const RecommendTotal = styled.p`
  margin: 5px 0;
  color: ${styles.colors.logColor};
  font-size: 14px;
  font-weight: 900;
  line-height: 160%;
`;
