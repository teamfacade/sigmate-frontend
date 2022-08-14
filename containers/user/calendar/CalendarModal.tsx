import { memo, MouseEventHandler, useState, useCallback } from 'react';
import styled from 'styled-components';
import { SectionWrapper } from 'components/global';
import { Mintings, MintDetail } from 'components/user/calendar';
import { Close as CloseIcon } from 'public/Icons/global';
import styles from 'styles/styleLib';

type PropsType = {
  date?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export type MintingType = {
  name: string;
  publisher: string;
  thumbnailURL: string;
  date: string;
  price: string;
  wikiPage?: string;
  mintPage?: string;
};

/* @todo
  1. 사용자가 민팅 세부 정보를 누를 때마다 O(n) 만큼의 탐색 없이 바로 데이터를 찾을 수 있는 방법?
  2. shallow comparison 때문에 매번 리렌더링되는 MintDetail의 성능 개선
*/
export default memo(function CalendarModal({ date, onClick }: PropsType) {
  const mintings: MintingType[] = [
    {
      name: '#56382',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: '24.12.2022',
      price: '10ETH',
    },
    {
      name: '#34382',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: '24.12.2022',
      price: '10ETH',
    },
    {
      name: '#19',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: '24.12.2022',
      price: '10ETH',
    },
    {
      name: '#2382',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: '24.12.2022',
      price: '10ETH',
    },
    {
      name: '#655',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: '24.12.2022',
      price: '10ETH',
    },
    {
      name: '#56383',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: '24.12.2022',
      price: '10ETH',
    },
    {
      name: '#56384',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: '24.12.2022',
      price: '10ETH',
    },
  ];
  const [showDetail, setShowDetail] = useState('');

  const onClickMintItem: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.currentTarget.dataset.name)
        setShowDetail(e.currentTarget.dataset.name);
    },
    []
  );

  const onClickBack: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShowDetail('');
  }, []);

  return (
    <Background>
      <Modal>
        <SectionWrapper
          header={showDetail || date || 'MM.DD.YYYY'}
          marginBottom="16px"
        >
          <Back onClick={onClickBack} show={showDetail !== ''}>
            {'<'}
          </Back>
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
    </Background>
  );
});

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Modal = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 750px;
  padding: 33px;
  background-color: ${styles.colors.globalBackgroundColor};
  border-radius: 10px;
  overflow-y: hidden;
  box-shadow: ${styles.shadows.modalShadow};
`;

const Close = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 28px 32px 16px 0;
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

const Back = styled(Close)<{ show: boolean }>`
  display: ${({ show }) => (show ? 'initial' : 'none')};
  top: 13px;
  right: 50px;
  font-size: 50px;
  margin: 0 30px 0 0;
`;
