import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import EditDate from './EditDate';

export default memo(function RecentEdits() {
  return (
    <Wrapper>
      <Header>Recent Edits</Header>
      <EditsWrapper>
        {/* @todo 서버에서 N개 받아와서 map 함수를 통해 렌더링 */}
        <Edit>
          <EditDate dateString={Date.now()} />
          <p>Title example</p>
        </Edit>
        <Edit>
          <EditDate dateString={Date.now()} />
          <p>Title example</p>
        </Edit>
        <Edit>
          <EditDate dateString={Date.now()} />
          <p>Title example</p>
        </Edit>
        <Edit>
          <EditDate dateString={Date.now()} />
          <p>Title example</p>
        </Edit>
      </EditsWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: ${styles.shadows.containerShadow};
`;

const Header = styled.h2`
  margin: 0;
  padding-bottom: 20px;
  color: #323c4d;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
`;

const EditsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Edit = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fafbfc;
  border-radius: 8px;

  :not(:first-child) {
    margin-top: 10px;
  }

  p {
    display: inline-block;
    padding: 7px 0;
    margin: 0;
    color: #626262;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
  }
`;
