import { MouseEventHandler, useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  BasicWrapper,
  SectionWrapper,
  Search,
  LogTable,
  PageMoveBtns,
} from 'components/global';
import { LogHead, LogItem } from 'components/admin/content';

const ExArticle: Admin.ArticleDataType = {
  id: 1,
  name: 'Puuvila',
  views: '300',
  editedUsers: '20',
  lastEdit: new Date(Date.now()).toISOString(),
};

const ExArticles = [
  ExArticle,
  { ...ExArticle, id: '2' },
  { ...ExArticle, id: '3' },
  { ...ExArticle, id: '4' },
  { ...ExArticle, id: '5' },
  { ...ExArticle, id: '6' },
  { ...ExArticle, id: '7' },
  { ...ExArticle, id: '8' },
  { ...ExArticle, id: '9' },
  { ...ExArticle, id: '0' },
];
const total = 4242;

export default function ContentManagement() {
  const [curPage, setCurPage] = useState(1);

  const onClickPageNumBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setCurPage(parseInt(e.currentTarget.value, 10));
      // eslint-disable-next-line no-alert
      alert(
        `Fetch 10 referral logs from ${
          (parseInt(e.currentTarget.value, 10) - 1) * 10
        }th log`
      );
    },
    []
  );

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          // eslint-disable-next-line no-alert
          alert(`Fetch 10 referral logs from 0th log`);
          setCurPage(1);
          break;
        case 'Prev':
          // eslint-disable-next-line no-alert
          alert(`Fetch 10 referral logs from ${(curPage - 1 - 1) * 10}th log`);
          setCurPage((cur) => cur - 1);
          break;
        case 'Next':
          // eslint-disable-next-line
          alert(`Fetch 10 referral logs from ${curPage * 10}th log`);
          setCurPage((cur) => cur + 1);
          break;
        case 'ToLast':
          // eslint-disable-next-line
          alert(`Fetch 10 referral logs from ((total / 10) * 10)th log`);
          setCurPage(Math.floor(total / 10) + 1);
          break;
        default:
          break;
      }
    },
    [curPage]
  );

  return (
    <Wrapper>
      <BasicWrapper>
        <SectionWrapper header="Article list">
          <Search />
          <LogTable gap="5vw">
            <LogHead />
            {ExArticles.map((article) => (
              <LogItem
                key={article.id}
                name={article.name}
                views={article.views}
                editedUsers={article.editedUsers}
                lastEdit={article.lastEdit}
              />
            ))}
          </LogTable>
          <PageMoveBtns
            onClickPageNumBtn={onClickPageNumBtn}
            onClickPageMoveBtn={onClickPageMoveBtn}
            totalPage={total}
            curPage={curPage}
          />
        </SectionWrapper>
      </BasicWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  div + div {
    margin-top: 20px;
  }
`;
