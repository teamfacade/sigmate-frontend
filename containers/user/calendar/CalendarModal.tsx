import {
  memo,
  MouseEventHandler,
  useState,
  useCallback,
  forwardRef,
} from 'react';
import { SectionWrapper, Modal, ModalClose } from 'components/global';
import { Mintings, MintDetail } from 'components/user/calendar';

type PropsType = {
  date?: string;
  mintings: Minting.ScheduleType[];
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
      <Modal fixedWidth height="initial" ref={ref}>
        <SectionWrapper
          onClickBack={showDetail ? onClickBack : undefined}
          header={showDetail || date || 'MM.DD.YYYY'}
          marginBottom="16px"
        >
          <ModalClose onClick={onClick} />
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
