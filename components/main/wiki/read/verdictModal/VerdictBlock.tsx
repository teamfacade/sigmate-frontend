import {
  ReactNode,
  memo,
  MouseEventHandler,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';
import styled from 'styled-components';
import { VerdictType } from 'lib/main/wiki/getWikiData';
import { VerdictBtn } from 'components/main/wiki/read/verdictModal';
import styles from 'styles/styleLib';
import { VoteType } from '../../../../../containers/main/wiki/read/WikiArticle';

type PropsType = {
  id: number;
  setShowModal: Dispatch<SetStateAction<number>>;
  verdict: VerdictType;
  children: ReactNode;
};

export default memo(function VerdictBlock({
  id,
  setShowModal,
  verdict,
  children,
}: PropsType) {
  const [showBtn, setShowBtn] = useState(false);
  const [commented, setCommented] = useState(false);
  const [vote, setVote] = useState<VoteType>({
    voted: verdict?.voted || '',
    timestamp: new Date(Date.now()).toISOString(),
  });

  const onClickVerdict: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setVote({
        voted: e.currentTarget.name,
        timestamp: new Date(Date.now()).toISOString(),
      });
    },
    []
  );

  const onMouseEnter: MouseEventHandler<HTMLDivElement> = useCallback(
    () => setShowBtn(true),
    []
  );
  const onMouseLeave: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    setShowBtn(false);
  }, []);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'Comment':
          setShowBtn(false);
          setCommented(true);
          break;
        case 'More':
          setShowBtn(false);
          setShowModal(id);
          break;
        default:
          break;
      }
    },
    [id]
  );

  const percentage = useMemo(() => {
    if (verdict) {
      const { verify, warning } = verdict;
      return ((verify / (verify + warning)) * 100).toFixed(1);
    }
    return 0;
  }, [verdict]);

  return (
    <Wrapper
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      percentage={percentage}
    >
      {children}
      {showBtn && (
        <BtnWrapper>
          <VerdictBtn
            onClick={onClickVerdict}
            name="Verify"
            content={verdict?.verify.toString(10)}
            voted={vote.voted}
          />
          <VerdictBtn
            onClick={onClickVerdict}
            name="Warning"
            content={verdict?.warning.toString(10)}
            voted={vote.voted}
          />
          <VerdictBtn
            onClick={onClick}
            name="Comment"
            content={verdict?.comments.length.toString(10)}
            voted={vote.voted}
            commented={commented}
          />
          <VerdictBtn onClick={onClick} name="More" voted="" />
        </BtnWrapper>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.div<{ percentage: number }>`
  position: relative;
  padding: 20px;
  border: 1px solid transparent;
  border-left: 4px solid
    ${({ percentage }) => {
      if (percentage > 50)
        return `rgba(39, 107, 255, ${(((percentage - 50) * 2) / 100).toFixed(
          2
        )})`;
      if (percentage === 50) return 'transparent';
      return `rgba(220, 38, 38, ${(((50 - percentage) * 2) / 100).toFixed(
          2
        )})`;
    }} !important;

  :hover {
    border-color: #276bff;
  }
`;

const BtnWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-100%);
  display: flex;
  align-items: center;
  height: 36px;
  padding: 4px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: ${styles.shadows.verdictBtnShadow};
  z-index: 1;
`;
