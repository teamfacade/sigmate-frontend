import { memo } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { BasicWrapper, SectionWrapper } from 'components/global';
import { Header } from 'components/user/account';

const VerdictDisplayOptions: OptionType[] = [
  { value: 'ColorBar', label: 'Show color bar (default)' },
  { value: 'Hide', label: 'Hide' },
];

export default memo(function WikiSettings() {
  return (
    <BasicWrapper margin="20px 0 0 0">
      <SectionWrapper header="Wiki setting" marginBottom="30px">
        <SelectWrapper>
          <Header>Display community verdict while reading</Header>
          <Select options={VerdictDisplayOptions} />
        </SelectWrapper>
      </SectionWrapper>
    </BasicWrapper>
  );
});

const SelectWrapper = styled.div`
  padding: 0 0 80px 20px;
`;
