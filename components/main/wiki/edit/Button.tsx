import { memo } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: block;
  border: none;
  background-color: transparent;
  text-align: left;
`;

export default memo(Button);
