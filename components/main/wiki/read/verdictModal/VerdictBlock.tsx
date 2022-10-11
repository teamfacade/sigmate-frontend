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
  verificationCounts: Wiki.VerificationCountType;
  myVerification: boolean | null;
  opinionCount: number;
  isKeyInfo?: string;
  children: ReactNode;
};

export default memo(function VerdictBlock({
  id,
  setShowModal,
  verificationCounts,
  myVerification,
  opinionCount,
  isKeyInfo = undefined,
  children,
}: PropsType) {
  const [showBtn, setShowBtn] = useState(false);
  const [commented, setCommented] = useState(false);
  const [vote, setVote] = useState<Wiki.VerificationType>({
    verificationCounts,
    myVerification,
  });

  const onClickVerdict: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const { name } = e.currentTarget;
      setVote((current) => {
        // user voted first time
        if (current.myVerification === null) {
          return {
            verificationCounts: {
              verifyCount:
                current.verificationCounts.verifyCount +
                (name === 'Verify' ? 1 : 0),
              beAwareCount:
                current.verificationCounts.beAwareCount +
                (name === 'Warning' ? 1 : 0),
            },
            myVerification: name === 'Verify',
          };
        }
        if (name === 'Verify') {
          // canceled verify
          if (current.myVerification) {
            return {
              ...current,
              verificationCounts: {
                ...current.verificationCounts,
                verifyCount: current.verificationCounts.verifyCount - 1,
              },
              myVerification: null,
            };
          }
          return {
            verificationCounts: {
              verifyCount: current.verificationCounts.verifyCount + 1,
              beAwareCount: current.verificationCounts.beAwareCount - 1,
            },
            myVerification: true,
          };
        }
        // name === 'BeAware'
        if (current.myVerification) {
          return {
            verificationCounts: {
              verifyCount: current.verificationCounts.verifyCount - 1,
              beAwareCount: current.verificationCounts.beAwareCount + 1,
            },
            myVerification: false,
          };
        }
        // canceled warning
        return {
          verificationCounts: {
            ...current.verificationCounts,
            beAwareCount: current.verificationCounts.beAwareCount - 1,
          },
          myVerification: null,
        };
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
          setShowModal((current) => ({
            ...current,
            isKeyInfo: !!isKeyInfo,
            blockID: isKeyInfo || id.toString(10),
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
      const { verifyCount, beAwareCount } = vote.verificationCounts;
      return ((verifyCount / (verifyCount + beAwareCount)) * 100).toFixed(1);
    }
    return '0';
  }, [vote]);

  return (
    <Wrapper
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      isKeyInfo={!!isKeyInfo}
      percentage={Number.parseInt(percentage, 10)}
    >
      {children}
      {showBtn && (
        <BtnWrapper>
          <VerdictBtn
            onClick={onClickVerdict}
            name="Verify"
            content={vote.verificationCounts.verifyCount.toString(10)}
            isUpvote={vote.myVerification}
          />
          <VerdictBtn
            onClick={onClickVerdict}
            name="Warning"
            content={vote.verificationCounts.beAwareCount.toString(10)}
            isUpvote={vote.myVerification}
          />
          <VerdictBtn
            onClick={onClick}
            name="Comment"
            content={opinionCount.toString(10)}
            isUpvote={null}
            commented={commented}
          />
          <VerdictBtn onClick={onClick} name="More" isUpvote={null} />
        </BtnWrapper>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.div<{ isKeyInfo: boolean; percentage: number }>`
  position: relative;
  ${({ isKeyInfo }) => {
    if (isKeyInfo)
      return `width: 100%; height: 100%; display: flex; align-items: center;`;
    return `padding: 20px;`;
  }};
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
    background-color: ${styles.colors.lightThumbsUpColor};
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
