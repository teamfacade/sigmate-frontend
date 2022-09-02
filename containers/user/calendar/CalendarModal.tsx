import {
  memo,
  MouseEventHandler,
  useState,
  useCallback,
  forwardRef,
} from 'react';
import styled from 'styled-components';
import { SectionWrapper, Modal } from 'components/global';
import { Mintings, MintDetail } from 'components/user/calendar';
import { Close as CloseIcon } from 'public/Icons/global';

type PropsType = {
  date?: string;
  mintings: MintingType[];
  onClick: MouseEventHandler<HTMLButtonElement>;
};

/* @todo
  1. 사용자가 민팅 세부 정보를 누를 때마다 O(n) 만큼의 탐색 없이 바로 데이터를 찾을 수 있는 방법?
  2. shallow comparison 때문에 매번 리렌더링되는 MintDetail의 성능 개선
*/
export default memo(
  forwardRef<HTMLDivElement, PropsType>(function CalendarModal(
    { date, mintings, onClick },
    ref
  ) {
    const [showDetail, setShowDetail] = useState('');

    const onClickMintItem: MouseEventHandler<HTMLDivElement> = useCallback(
      (e) => {
        if (e.currentTarget.dataset.name)
          setShowDetail(e.currentTarget.dataset.name);
      },
      []
    );

    const onClickBack: MouseEventHandler<HTMLButtonElement> =
      useCallback(() => {
        setShowDetail('');
      }, []);

    return (
      <Modal ref={ref}>
        <SectionWrapper
          onClickBack={showDetail ? onClickBack : undefined}
          header={showDetail || date || 'MM.DD.YYYY'}
          marginBottom="16px"
        >
          <Close onClick={onClick}>
            <CloseIcon />
          </Close>
          {showDetail ? (
            <MintDetail
              mint={mintings.find((minting) => minting.name === showDetail)}
            />
          ) : (
            <Mintings mintings={mintings} onClickMintItem={onClickMintItem} />
          )}
        </SectionWrapper>
      </Modal>
    );
  })
);

const Close = styled.button`
  position: absolute;
  top: -3px;
  right: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  color: #c7cdd6;
  cursor: pointer;

  &:hover {
    svg {
      transform: scale(1.1);
    }
  }
`;
