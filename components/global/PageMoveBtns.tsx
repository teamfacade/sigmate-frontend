import { memo, MouseEventHandler, useMemo } from 'react';
import styled from 'styled-components';
import { ToFirst, Prev, Next, ToLast } from 'public/Icons/global';
import styles from 'styles/styleLib';

type PropsType = {
  curPage: number;
  totalPage: number;
  onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement>;
  onClickPageNumBtn: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function PageMoveBtns({
  curPage,
  totalPage,
  onClickPageMoveBtn,
  onClickPageNumBtn,
}: PropsType) {
  const start = useMemo(() => (curPage <= 6 ? 1 : curPage - 5), [curPage]);
  const nums = useMemo(() => {
    return Array.from(
      { length: totalPage - curPage >= 5 ? 10 : totalPage - curPage + 6 },
      (_, i) => start + i
    );
  }, [curPage, start]);

  return (
    <Wrapper>
      <MoveBtn name="ToFirst" margin="0 12px 0 0" onClick={onClickPageMoveBtn}>
        <ToFirst />
      </MoveBtn>
      <MoveBtn
        name="Prev"
        margin="0 12px 0 0"
        disabled={curPage === 1}
        onClick={onClickPageMoveBtn}
      >
        <Prev />
      </MoveBtn>
      {nums.map((num) => {
        return (
          <PageBtn
            key={num}
            value={num}
            cur={curPage === num}
            onClick={onClickPageNumBtn}
          >
            <p>{num}</p>
          </PageBtn>
        );
      })}
      <MoveBtn
        name="Next"
        margin="0 12px 0 12px"
        disabled={totalPage - curPage === 0}
        onClick={onClickPageMoveBtn}
      >
        <Next />
      </MoveBtn>
      <MoveBtn name="ToLast" margin="0" onClick={onClickPageMoveBtn}>
        <ToLast />
      </MoveBtn>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
`;

const MoveBtn = styled.button<{ margin: string }>`
  padding: 7px 12px;
  margin: ${({ margin }) => margin};
  background-color: transparent;
  border-radius: 8px;
  border: 1px solid ${styles.colors.lightBorderColor};
  font-family: 'Inter', sans-serif;
`;

const PageBtn = styled.button<{ cur: boolean }>`
  position: relative;
  width: 30px;
  height: 30px;
  background-color: ${({ cur }) => (cur ? '#EDF1FB' : 'transparent')};
  color: ${({ cur }) =>
    cur ? styles.colors.emphColor : styles.colors.boldTextColor};
  border-radius: 8px;
  border: none;
  font-weight: ${({ cur }) => (cur ? 'bold' : 'normal')};
  font-size: 20px;
  font-family: 'Inter', sans-serif;

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
  }
`;
