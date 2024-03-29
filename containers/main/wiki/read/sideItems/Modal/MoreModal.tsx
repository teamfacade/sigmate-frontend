import {
  memo,
  MouseEventHandler,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { useAppSelector } from 'hooks/reduxStoreHooks';
import { Contents, BlurDiv } from 'containers/main/wiki/read/sideItems/Modal';
import { SectionWrapper, Modal } from 'components/global';
import { Close as CloseIcon } from 'public/Icons/global';

type PropsType = {
  header: string;
  cid?: number | null;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default memo(
  forwardRef<HTMLDivElement, PropsType>(function MoreModal(
    { header, cid, onClick },
    ref
  ) {
    const { signedIn } = useAppSelector(({ auth }) => auth);
    const { agreeTos } = useAppSelector(({ account }) => account);

    return (
      <Modal ref={ref}>
        <SectionWrapper header={header} marginBottom="16px">
          <Close onClick={onClick}>
            <CloseIcon />
          </Close>
          <Contents header={header} cid={cid} />
          {!(signedIn && agreeTos) && <BlurDiv signedIn={signedIn} />}
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
