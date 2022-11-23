import {
  Dispatch,
  memo,
  MouseEventHandler,
  SetStateAction,
  useMemo,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { ToFirst, Prev, Next, ToLast } from 'public/Icons/global';
import styles from 'styles/styleLib';

type PropsType = {
  curPage: number;
  totalPage: number;
  setCurPage: Dispatch<SetStateAction<number>>;
};

export default memo(function PageMoveBtns({
  curPage,
  totalPage,
  setCurPage,
}: PropsType) {
  /** 현재 페이지 왼쪽에 페이지 5개. 1 ~ 5페이지 까지는 무조건 1에서 시작 */
  const start = useMemo(() => (curPage < 6 ? 1 : curPage - 5), [curPage]);
  const nums = useMemo(() => {
    let len;
    /** 전체 페이지 5개 이하: 전부 다 렌더링 */
    if (totalPage <= 5) len = totalPage;
    /** 전체 페이지 5개 이상 && 남은 페이지 5개 이상: 10개 렌더링 */ else if (
      totalPage - curPage >=
      5
    )
      len = 10;
    /** 전체 페이지 5개 이상 && 남은 페이지 5개 미만: 5(왼쪽) + 1(지금) + 남은 거 렌더링 */ else
      len = totalPage - curPage + 6;

    return Array.from({ length: len }, (_, i) => start + i);
  }, [curPage, totalPage, start]);

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          setCurPage(1);
          break;
        case 'Prev':
          setCurPage((cur) => Math.max(1, cur - 1));
          break;
        case 'Next':
          setCurPage((cur) => Math.min(totalPage, cur + 1));
          break;
        case 'ToLast':
          setCurPage(totalPage);
          break;
        default:
          break;
      }
    },
    [totalPage]
  );

  const onClickPageNumBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setCurPage(parseInt(e.currentTarget.value, 10));
    },
    []
  );

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
  position: relative;
  width: 34px;
  height: 34px;
  margin: ${({ margin }) => margin};
  background-color: transparent;
  border-radius: 8px;
  border: 1px solid ${styles.colors.lightBorderColor};
  font-family: 'Inter', sans-serif;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
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
