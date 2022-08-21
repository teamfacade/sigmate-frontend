import {
  ReactNode,
  memo,
  MouseEventHandler,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import styled from 'styled-components';
import { VerdictBtn } from 'components/main/wiki/read';
import styles from 'styles/styleLib';

type PropsType = {
  id: number;
  setShowVerdictModal: Dispatch<SetStateAction<number>>;
  voted: string;
  onClickVerdict: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

export default memo(function VerdictBlock({
  id,
  setShowVerdictModal,
  voted,
  onClickVerdict,
  children,
}: PropsType) {
  const [showBtn, setShowBtn] = useState(false);
  const [commented, setCommented] = useState(false);

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
          setShowVerdictModal(id);
          break;
        default:
          break;
      }
    },
    [setShowVerdictModal, id]
  );

  return (
    <Wrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
      {showBtn && (
        <BtnWrapper>
          <VerdictBtn
            onClick={onClickVerdict}
            name="ThumbsUp"
            content="2400"
            voted={voted}
          />
          <VerdictBtn
            onClick={onClickVerdict}
            name="Warning"
            content="351"
            voted={voted}
          />
          <VerdictBtn
            onClick={onClick}
            name="Comment"
            content="14"
            voted={voted}
            commented={commented}
          />
          <VerdictBtn onClick={onClick} name="More" voted="" />
        </BtnWrapper>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
  padding: 20px;
  border: 1px solid transparent;

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
