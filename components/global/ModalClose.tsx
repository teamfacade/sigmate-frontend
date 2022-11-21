import styled from 'styled-components';
import { MouseEventHandler } from 'react';
import { Close as CloseIcon } from 'public/Icons/global';

type PropsType = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function ModalClose({ onClick }: PropsType) {
  return (
    <Close onClick={onClick}>
      <CloseIcon />
    </Close>
  );
}

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
