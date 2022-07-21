import styled from 'styled-components';
import { BasicWrapper, SectionWrapper } from 'components/global';

export default function Tokens() {
  return (
    <BasicWrapper>
      <SectionWrapper header="Points" marginBottom="25px">
        <Table>
          <thead />
          <tbody />
        </Table>
      </SectionWrapper>
    </BasicWrapper>
  );
}

const Table = styled.table`
  border-spacing: 0 10px;
`;
