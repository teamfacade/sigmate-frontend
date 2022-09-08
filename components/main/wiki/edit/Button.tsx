import { memo } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background-color: transparent;
  text-align: left;

  :hover,
  :active {
    filter: none;
  }
`;

export default memo(Button);
