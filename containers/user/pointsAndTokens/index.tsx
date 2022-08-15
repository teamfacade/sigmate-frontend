import styled from 'styled-components';
import { BasicWrapper, SectionWrapper } from 'components/global';
import { LogHead, LogItem } from 'components/user/points';

export default function Points() {
  return (
    <BasicWrapper>
      <SectionWrapper header="Points" marginBottom="25px">
        <Table>
          <LogHead />
          <LogItem
            timestamp={1658389880695}
            task="Daily login"
            entity="System"
            point="10"
          />
          <LogItem
            timestamp={1658389880695}
            task="Daily login"
            entity="System"
            point="10"
          />
          <LogItem
            timestamp={1658389880695}
            task="Daily login"
            entity="System"
            point="10"
          />
          <LogItem
            timestamp={1658389880695}
            task="Daily login"
            entity="System"
            point="10"
          />
        </Table>
      </SectionWrapper>
    </BasicWrapper>
  );
}

const Table = styled.table`
  border-spacing: 0 10px;

  thead {
    font-size: 15px;
    font-weight: bold;

    th {
      padding-left: 10vw;
      text-align: start;

      :last-child {
        padding-right: 10vw;
      }
    }
  }

  td {
    padding: 10px 0 10px 10vw;
    text-align: start;

    :last-child {
      padding-right: 10vw;
    }
  }
`;
