import { memo, useState, useCallback, useRef, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { CSSTransition } from 'react-transition-group';
import { Happened } from 'containers/main/wiki/read/sideItems';
import { MoreModal } from 'containers/main/wiki/read/sideItems/Modal';
import { SideItemWrapper } from 'components/main/wiki/read/sideItems';
import styles from 'styles/styleLib';

type HappenedType = {
  id: number;
  platform: string;
  author: string;
  timestamp: string;
  content: string;
};

const ExHappen: HappenedType = {
  id: 1,
  platform: 'Discord',
  author: 'Limeahn',
  timestamp: new Date(Date.now()).toISOString(),
  content:
    'ece of classical Latin literature from 45 BC, making  over 2000 years old. \n' +
    'Richard McClintock, a Latin profes BC, making  over 2000 years  BC, making  over 2000 years  BC,rs old\n' +
    'ece of classical Latin literature from 45 BC, making  over 200chard McClintock, a Latin profes BC, making  over 2000 years  BC, making  over 2000 years  BC,rs oldece of classical Latin literature from 45 BC, making  over 2000 years old. \n' +
    '\n' +
    'Richard McClintock, a Latin profes BC, making  over 2000 years  BC, making  over 2000 years  BC,rs oldece of class00 years  BC,rs oldece of classical Latin literature from 45 BC, making  over 2000 years old. \n' +
    '\n' +
    'Richard McClintock, a Latin profes BC, making  over 2000 years  BC, making  over 2000 years  BC,rs oldece of classical Latin literature from 45 BC, making  over 2000 years old. Richard McClintock, a Latin profes BC, making  ovever 2000 years  BC,rs oldece of classical Latin literature from 45 BC, making  over 2000 years old. ichard McClintock, a Latin profes BC, making  over 2000 years  BC, making  over 2000 years  BC,rs old\n' +
    '\n' +
    'oldece of classical Latin literature from 45 BC, making  over 2000 years old. Richard McClintock, a Latin profes BC, making  ovever 2000 years  BC,rs oldece of classical Latin literature from 45 BC, making  over 2000 years old. ichard McClintock, a Latin profes BC, making  over 2000 years  BC, ma king  over 2000 years  BC,rs old\n' +
    '\n' +
    ' ichard McClintock, a Latin profes BC, making  over 2000 years  BC, making  over 2000 years  BC,rs old',
};

const ExHappens: HappenedType[] = [
  ExHappen,
  { ...ExHappen, id: 2 },
  { ...ExHappen, platform: 'Twitter', id: 3 },
  { ...ExHappen, id: 4 },
  { ...ExHappen, id: 5 },
];

type PropsType = {
  title: string;
};

export default memo(function WhatsHappening({ title }: PropsType) {
  // eslint-disable-next-line
  console.log(`What's happening at ${title}?`);

  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const onClickMore: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowModal(true),
    []
  );
  const onClickClose: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowModal(false),
    []
  );

  return (
    <>
      <SideItemWrapper header={"What's happening"}>
        {ExHappens.slice(0, 3).map((happen) => (
          <Happened
            key={happen.id}
            platform={happen.platform}
            author={happen.author}
            timestamp={happen.timestamp}
            content={happen.content}
          />
        ))}
        <BtnWrapper>
          <MoreBtn onClick={onClickMore}>more...</MoreBtn>
        </BtnWrapper>
      </SideItemWrapper>
      <CSSTransition
        in={showModal}
        timeout={300}
        unmountOnExit
        classNames="show-modal"
        nodeRef={modalRef}
      >
        <MoreModal
          header={"What's happening"}
          onClick={onClickClose}
          ref={modalRef}
        />
      </CSSTransition>
    </>
  );
});

const BtnWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 17px;
  margin-top: 8px;
`;

const MoreBtn = styled.button`
  position: absolute;
  right: 0;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  color: ${styles.colors.emphColor};
  font-size: 14px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  cursor: pointer;

  :hover,
  :active {
    color: ${darken(0.3, styles.colors.emphColor)};
  }
`;
