import styled from 'styled-components';
import Select from 'react-select';
import { Heading } from 'components/main/wiki/read';
import options from 'components/main/wiki/TypeOptions';

type PropsType = {
  onChange: MultiSelectChangeEventHandler;
};

export default function SelectTypes({ onChange }: PropsType) {
  return (
    <Wrapper>
      <Heading content="Type" />
      <Select onChange={onChange} options={options} isMulti />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 30px;
`;
