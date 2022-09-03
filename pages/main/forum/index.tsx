import {
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react';
import { InferGetStaticPropsType } from 'next';
import styled from 'styled-components';
import { getCategoriesData } from 'lib/main/forum/getForumDatas';
import { SearchUtils, Categories } from 'containers/main/forum/main';
import { PageMoveBtns } from 'components/global';

const total = 13;

export default function ForumMain({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [filter, setFilter] = useState<ForumSearchFilter>('Category');
  const [curPage, setCurPage] = useState(1);

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
      // eslint-disable-next-line no-alert
      alert(
        `Fetch 15 categories from ${
          (parseInt(e.currentTarget.value, 10) - 1) * 15
        }`
      );
    },
    []
  );

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          // eslint-disable-next-line no-alert
          alert(`Fetch 15 categories from 0th`);
          setCurPage(1);
          break;
        case 'Prev':
          // eslint-disable-next-line no-alert
          alert(`Fetch 15 categories from ${(curPage - 1 - 1) * 15}th `);
          setCurPage((cur) => cur - 1);
          break;
        case 'Next':
          // eslint-disable-next-line
          alert(`Fetch 15 categories from ${curPage * 15}th`);
          setCurPage((cur) => cur + 1);
          break;
        case 'ToLast':
          // eslint-disable-next-line
          alert(`Fetch 15 categories from ((total / 15) * 10)th`);
          setCurPage(
            Math.floor(Number.parseInt((total / 15).toFixed(), 10)) + 1
          );
          break;
        default:
          break;
      }
    },
    [curPage]
  );
  return (
    <Wrapper>
      <SearchUtils setFilter={setFilter} onSearch={onSearch} />
      <Categories categories={categories} />
      <PageMoveBtns
        totalPage={total}
        curPage={curPage}
        onClickPageMoveBtn={onClickPageMoveBtn}
        onClickPageNumBtn={onClickPageNumBtn}
      />
    </Wrapper>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // @todo Fetch necessary data for the wiki article using params.title
  const categories: Forum.CategoryType[] = getCategoriesData();
  return {
    props: {
      categories,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 minutes
    revalidate: 300, // In seconds
  };
}

const Wrapper = styled.div`
  max-width: 1060px;
  margin: auto;
`;
