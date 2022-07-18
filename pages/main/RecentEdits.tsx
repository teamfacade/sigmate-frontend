import { memo } from 'react';
import styled from 'styled-components';
import { TableRow } from 'components/main';

export default memo(function RecentEdits() {
  return (
    <Wrapper>
      <Heading>Recent edits</Heading>
      <hr />
      <Table>
        <thead>
          <tr>
            <THead>Name</THead>
            <THead>Editor</THead>
            <THead>Edited Date</THead>
          </tr>
        </thead>
        <tbody>
          {/* @todo 서버에서 받은 데이터들을 map 함수를 통해 렌더링 */}
          <TableRow
            article="Edited Content"
            editor="admin"
            timestamp={1658125040429}
          />
          <TableRow
            article="Edited t"
            editor="admin"
            timestamp={1658125040429}
          />
          <TableRow
            article="Edited Content"
            editor="admin"
            timestamp={1658125040429}
          />
          <TableRow
            article="Edited Content"
            editor="admin"
            timestamp={1658125040429}
          />
          <TableRow
            article="Edited Content"
            editor="admin"
            timestamp={1658125040429}
          />
        </tbody>
      </Table>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 100%;

  hr {
    margin: 16px 0;
    border: none;
    border-bottom: 1px solid #dedede;
  }
`;

const Heading = styled.h3`
  margin: 0;
  color: #323c4d;
`;

const Table = styled.table`
  border-spacing: 0 20px;
  
  th, td {
    :not(:first-child) {
      padding-left: 100px;
    }
  }
  
  td {
    :not(:last-child) {
      color: #276BFF;
      font-size: 15px;
      font-weight: bold;
  }
`;

const THead = styled.th`
  color: #626262;
  text-align: left;
  font-size: 15px;
  font-weight: bold;
  font-family: 'AppleSDGothicNeo', sans-serif;
`;
