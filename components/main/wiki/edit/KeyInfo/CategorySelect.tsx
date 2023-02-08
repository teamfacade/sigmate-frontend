import { ChangeEventHandler } from 'react';
import useSWR, { Fetcher } from 'swr';
import {
  Td,
  Th,
  Tr,
} from 'components/main/wiki/edit/KeyInfo/KeyinfoComponents';
import Axios from 'lib/global/axiosInstance';

type PropsType = {
  title: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
};

const categoriesFetcher: Fetcher<CollectionCategoryType[], string> = async (
  url: string
) => {
  const { status, data } = await Axios.get(url);
  if (status === 200) {
    return data.categories || [];
  }
  alert(
    `Error while fetching collection categories: ERR ${status}.\r\nPlease reload the page.`
  );
  return [];
};

export default function CategorySelect({ title, onChange }: PropsType) {
  const { data: categories } = useSWR(
    `/wiki/collection/category`,
    categoriesFetcher
  );

  return (
    <Tr key={title}>
      <Th>
        <p>{title}</p>
      </Th>
      <Td key={title}>
        <select name="Category" onChange={onChange}>
          {categories?.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </Td>
    </Tr>
  );
}
