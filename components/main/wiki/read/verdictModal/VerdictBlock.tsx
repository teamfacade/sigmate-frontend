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
import { VerdictBtn } from 'components/main/wiki/read/verdictModal';
import styles from 'styles/styleLib';

type PropsType = {
  id: number;
  setShowModal: Dispatch<SetStateAction<Wiki.ModalDataType>>;
  verifications?: Wiki.BlockVerificationType;
  padding?: boolean;
  children: ReactNode;
};

export default memo(function VerdictBlock({
  id,
  setShowModal,
  verifications,
  padding = true,
  children,
}: PropsType) {
  const [showBtn, setShowBtn] = useState(false);
  const [commented, setCommented] = useState(false);
  const [vote, setVote] = useState<Wiki.VerificationType>(
    verifications?.verification as Wiki.VerificationType
  );

  const onClickVerdict: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const { name } = e.currentTarget;
      setVote((current) => ({
        ...current,
        isUpvote: name === 'Verify',
        timestamp: new Date(Date.now()).toISOString(),
      }));
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
          setShowModal((current) => ({
            ...current,
            isKeyInfo: !padding,
            blockID: id,
          }));
          break;
        default:
          break;
      }
    },
    [id]
  );

  const percentage = useMemo(() => {
    if (vote) {
      const { verify, warning } = vote;
      return ((verify / (verify + warning)) * 100).toFixed(1);
    }
    return '0';
  }, [vote]);

  return (
    <Wrapper
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      padding={padding}
      percentage={Number.parseInt(percentage, 10)}
    >
      {children}
      {showBtn && (
        <BtnWrapper>
          <VerdictBtn
            onClick={onClickVerdict}
            name="Verify"
            content={verifications?.verification?.verify.toString(10)}
            isUpvote={vote.isUpvote}
          />
          <VerdictBtn
            onClick={onClickVerdict}
            name="Warning"
            content={vote.warning.toString(10)}
            isUpvote={vote.isUpvote}
          />
          <VerdictBtn
            onClick={onClick}
            name="Comment"
            content={verifications?.comments.length.toString(10)}
            isUpvote={vote.isUpvote}
            commented={commented}
          />
          <VerdictBtn onClick={onClick} name="More" isUpvote={null} />
        </BtnWrapper>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.div<{ padding: boolean; percentage: number }>`
  position: relative;
  padding: ${({ padding }) => (padding ? '20px' : '0')};
  border-left: 4px solid
    ${({ percentage }) => {
      if (percentage > 50)
        return `rgba(39, 107, 255, ${(((percentage - 50) * 2) / 100).toFixed(
          2
        )})`;
      if (percentage === 50) return 'transparent';
      return `rgba(220, 38, 38, ${(((50 - percentage) * 2) / 100).toFixed(2)})`;
    }} !important;

  :hover {
    border: 1px solid #276bff;
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
