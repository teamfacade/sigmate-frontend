import styled from 'styled-components';
import { Phrases, Welcomes } from 'containers/main/landing';
import { BasicWrapper } from 'components/global';

export default function CatchPhrase() {
  return (
    <div style={{ width: '100%' }}>
      <BasicWrapper>
        <LayoutWrapper>
          <Phrases />
          <Welcomes />
        </LayoutWrapper>
      </BasicWrapper>
    </div>
  );
}

const LayoutWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 50px 60px;
`;
