import {
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react';
import styled from 'styled-components';
import Axios from 'lib/global/axiosInstance';
import { SearchUtils, Categories } from 'containers/main/forum/main';
import { PageMoveBtns } from 'components/global';
import useSWR, { Fetcher } from 'swr';

const fetcher: Fetcher<Forum.CategoryType[], string> = (url: string) =>
  Axios.get(url).then((res) => res.data.categories);

const limit = 15;

export default function ForumMain() {
  const [filter, setFilter] = useState<ForumSearchFilter>('Category');
  const [curPage, setCurPage] = useState(1);

  const { data: categories } = useSWR(
    `/forum/c?limit=${limit}&page=${curPage}`,
    fetcher
  );

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

  const onClickPageNumBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setCurPage(parseInt(e.currentTarget.value, 10));
    },
    []
  );

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          setCurPage(1);
          break;
        case 'Prev':
          setCurPage((cur) => cur - 1);
          break;
        case 'Next':
          setCurPage((cur) => cur + 1);
          break;
        case 'ToLast':
          setCurPage(
            Math.floor(
              Number.parseInt(((categories?.length || 0) / limit).toFixed(), 10)
            ) + 1
          );
          break;
        default:
          break;
      }
    },
    [categories]
  );
  return (
    <Wrapper>
      <SearchUtils setFilter={setFilter} onSearch={onSearch} />
      <Categories categories={categories || []} />
      <PageMoveBtns
        totalPage={(categories?.length || 0) / limit}
        curPage={curPage}
        onClickPageMoveBtn={onClickPageMoveBtn}
        onClickPageNumBtn={onClickPageNumBtn}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1080px;
  margin: auto;
`;
