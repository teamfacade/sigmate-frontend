import styled from 'styled-components';
import { Introduction } from 'containers/landing';

export default function MyApp() {
  return (
    <Wrapper>
      <Introduction />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-color: #f3f7ff;
`;
