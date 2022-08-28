import styled from 'styled-components';
import Edits from 'containers/user/edits/Edits';

export default function MyEdits() {
  return (
    <Wrapper>
      <Edits header="Recent" />
      <Edits header="Updated" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  div + div {
    margin-top: 20px;
  }
`;
