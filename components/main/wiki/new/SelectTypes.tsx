import styled from 'styled-components';
import Select from 'react-select';
import { Heading } from 'components/main/wiki/read';
import options from 'components/main/wiki/TypeOptions';

type PropsType = {
  value?: ReactSelect.OptionType[];
  onChange: ReactSelect.MultiSelectChangeEventHandler;
};

export default function SelectTypes({ value, onChange }: PropsType) {
  return (
    <Wrapper>
      <Heading content="Class" />
      <Select onChange={onChange} options={options} value={value} isMulti />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 30px 0;
`;
