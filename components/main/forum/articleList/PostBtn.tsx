import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { BlueBtnStyle } from 'styles/styleLib';

type PropsType = {
  onClickNew: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function PostBtn({ onClickNew }: PropsType) {
  return <BlueBtn onClick={onClickNew}>Post new</BlueBtn>;
});

const BlueBtn = styled.button`
  ${BlueBtnStyle};
  padding: 9px 30px;
`;
