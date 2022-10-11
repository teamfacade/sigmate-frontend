import useSWR, { Fetcher } from 'swr';
import styled from 'styled-components';
import Select from 'react-select';
import Axios from 'lib/global/axiosInstance';
import { Heading } from 'components/main/wiki/read';

type PropsType = {
  value?: ReactSelect.OptionType[];
  onChange: ReactSelect.MultiSelectChangeEventHandler;
};

const typesFetcher: Fetcher<ReactSelect.OptionType[], string> = async (
  url: string
) => {
  try {
    const { status, data } = await Axios.get(url);
    if (status === 200) {
      const { categories: types } = data;
      return (types as Forum.CategoryType[]).map((type) => ({
        value: type.id.toString(10),
        label: type.name,
      }));
    }
    return [];
  } catch (e) {
    alert(`Error while fetching categories: ERR ${e}`);
    return [];
  }
};

export default function SelectTypes({ value, onChange }: PropsType) {
  const { data: typeOptions } = useSWR('/forum/c', typesFetcher);
  return (
    <Wrapper>
      <Heading content="Class" />
      <Select onChange={onChange} options={typeOptions} value={value} isMulti />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 30px 0;
`;
