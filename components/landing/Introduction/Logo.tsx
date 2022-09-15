import styled from 'styled-components';
import { SigmateLogo } from 'public/Icons/landingPage';

export default function Logo() {
  return (
    <Bg>
      <SigmateLogo />
    </Bg>
  );
}

const Bg = styled.div`
  width: fit-content;
  padding: 13px 13px 10px 11px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 1px 120px 0 #7fb6e8;
`;
