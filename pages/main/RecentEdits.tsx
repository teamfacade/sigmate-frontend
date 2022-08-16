import { memo } from 'react';
import styled from 'styled-components';
import { SectionWrapper } from 'components/global';
import { TableRow } from 'components/main/RecentEdits';
import styles from 'styles/styleLib';

export default memo(function RecentEdits() {
  return (
    <SectionWrapper header="Recent edits">
      <Table>
        <colgroup>
          <col />
          <col style={{ width: '25%' }} />
          <col style={{ width: '22%' }} />
        </colgroup>
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
    </SectionWrapper>
  );
});

const Table = styled.table`
  max-width: 1000px;
  border-spacing: 0 20px;

  th,
  td {
    white-space: pre;

    :not(:first-child) {
      padding-left: 100px;
    }
  }

  td {
    :not(:last-child) {
      color: ${styles.colors.emphColor};
      font-size: 15px;
      font-weight: bold;
    }
  }
`;

const THead = styled.th`
  color: ${styles.colors.logColor};
  text-align: left;
  font-size: 15px;
  font-weight: bold;
  font-family: 'AppleSDGothicNeo', sans-serif;
`;
