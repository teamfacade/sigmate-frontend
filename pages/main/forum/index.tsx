import {
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react';
import styled from 'styled-components';
import { SearchUtils, Categories } from 'containers/main/forum/main';
import { PageMoveBtns } from 'components/global';

const CategoriesEx = [
  { name: 'Best', description: 'For PFP Users', imageURL: '' },
  { name: 'Game', description: 'For PFP Users', imageURL: '' },
  { name: 'PFP', description: 'For PFP Users', imageURL: '' },
  { name: 'Best', description: 'For PFP Users', imageURL: '' },
  { name: 'Best', description: 'For PFP Users', imageURL: '' },
  { name: 'Best', description: 'For PFP Users', imageURL: '' },
  { name: 'Best', description: 'For PFP Users', imageURL: '' },
  { name: 'Best', description: 'For PFP Users', imageURL: '' },
  { name: 'Best', description: 'For PFP Users', imageURL: '' },
  { name: 'Best', description: 'For PFP Users', imageURL: '' },
];
const total = 13;

export default function ForumMain() {
  const [filter, setFilter] = useState<ForumSearchFilter>('Category');
  const [curPage, setCurPage] = useState(1);

  const onSearch: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-alert
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
      <Categories categories={CategoriesEx} />
      <PageMoveBtns
        totalPage={total}
        curPage={curPage}
        onClickPageMoveBtn={onClickPageMoveBtn}
        onClickPageNumBtn={onClickPageNumBtn}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1060px;
  margin: auto;
`;
