import { useState } from 'react';
import styled from 'styled-components';
import Axios from 'lib/global/axiosInstance';
import { Categories } from 'containers/main/forum/main';
import { BasicWrapper, PageMoveBtns, initialSWRData } from 'components/global';
import useSWR, { Fetcher } from 'swr';
import { AxiosError } from 'axios';

const fetcher: Fetcher<PagedSWRDataType<Forum.CategoryType[]>, string> = async (
  url: string
) => {
  try {
    const { data, status } = await Axios.get(url);
    if (status === 200) {
      return { data: data.categories, total: 0 };
    } return initialSWRData;
  } catch (e) {
    alert(
      `Error white fetching forum categories. ERR: ${
        (e as AxiosError).response?.status
      }`
    );
    return initialSWRData;
  }
};

const limit = 15;

export default function ForumMain() {
  // const [filter, setFilter] = useState<ForumSearchFilter>('Category');
  const [curPage, setCurPage] = useState(1);

  const { data: categories = initialSWRData } = useSWR(
    `/forum/c?limit=${limit}&page=${curPage}`,
    fetcher
  );

  /*
  const onSearch: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      // @todo Axios -> setCategories(res.data)
      alert(
        `Search ${filter} who has ${
          (e.currentTarget.elements.namedItem('bar') as HTMLInputElement).value
        }`
      );
    },
    [filter]
  );
  */

  return (
    <Wrapper>
      {/* <SearchUtils setFilter={setFilter} onSearch={onSearch} /> */}
      {categories.data && categories.data.length > 0 ? (
        <Categories categories={categories.data} />
      ) : (
        <BasicWrapper>
          <LargeText>There's no categories yet : (</LargeText>
        </BasicWrapper>
      )}
      {categories.total > 0 && (
        <PageMoveBtns
          totalPage={categories.total}
          curPage={curPage}
          setCurPage={setCurPage}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1080px;
  margin: auto;
`;

const LargeText = styled.p`
  margin: auto;
  text-align: center;
  color: #96b8d7;
  font-family: 'Claris Sans', sans-serif;
  font-size: 50px;
  font-weight: 200;
  line-height: 150%;
`;
