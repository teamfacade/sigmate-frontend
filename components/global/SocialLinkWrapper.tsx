import { memo } from 'react';
import styled from 'styled-components';

const SocialLinkWrapper = styled.div<{
  btnWidth: string;
  btnHeight: string;
  marginLeft: string;
}>`
  display: flex;

  button {
    position: relative;
    width: ${({ btnWidth }) => btnWidth};
    height: ${({ btnHeight }) => btnHeight};
    border: none;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;

    > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  a + a {
    margin-left: ${({ marginLeft }) => marginLeft};
  }
`;

export default memo(SocialLinkWrapper);
