import { MouseEventHandler, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import {
  BasicWrapper,
  SectionWrapper,
  Search,
  LogTable,
  PageMoveBtns,
  Modal,
} from 'components/global';
import { LogHead, LogItem, CreateCategory } from 'components/admin/forum';
import { BlueBtnStyle } from 'styles/styleLib';

export const categories = [
  'Game',
  'Metaverse',
  'Collectibles',
  'Sports',
  'Utility',
  'Art',
  'Photography',
  'Defi',
  'Music',
  'Domain names',
  'DAO',
  'Meme',
];

const ExForumArticle: Admin.ForumArticleDataType = {
  id: 1,
  title: 'Sigmate fighting!!',
  category: 'Game',
  author: 'WKSEO',
  tags: ['hello', 'tired', 'so', 'annoying'],
  comments: 42,
  date: new Date(Date.now()).toISOString(),
};
const ExForumArticles = [
  ExForumArticle,
  { ...ExForumArticle, id: 2 },
  { ...ExForumArticle, id: 3 },
  { ...ExForumArticle, id: 4 },
  { ...ExForumArticle, id: 5 },
  { ...ExForumArticle, id: 6 },
  { ...ExForumArticle, id: 7 },
  { ...ExForumArticle, id: 8 },
  { ...ExForumArticle, id: 9 },
  { ...ExForumArticle, id: 0 },
];
const total = 4242;

export default function ForumManagement() {
  const [showModal, setShowModal] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const ModalRef = useRef<HTMLDivElement>(null);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowModal(true),
    []
  );

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    () => setShowModal(false),
    []
  );

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
    <>
      <Wrapper>
        <BasicWrapper>
          <SectionWrapper header="Forum articles">
            <div>
              <span>Category</span>
              <select name="category">
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <span>Tags</span>
            <Search />
            <CreateNewBtn name="new" onClick={onClick}>
              Add new
            </CreateNewBtn>
          </SectionWrapper>
        </BasicWrapper>
        <BasicWrapper>
          <SectionWrapper header="Search result">
            <LogTable gap="3vw">
              <LogHead />
              {ExForumArticles.map((article) => (
                <LogItem
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  category={article.category}
                  author={article.author}
                  tags={article.tags}
                  date={article.date}
                  comments={article.comments}
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
      <CSSTransition
        in={showModal}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
        nodeRef={ModalRef}
      >
        <Modal onMouseDown={onMouseDown} ref={ModalRef}>
          <CreateCategory />
        </Modal>
      </CSSTransition>
    </>
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

const CreateNewBtn = styled.button`
  ${BlueBtnStyle};
  position: absolute;
  top: -10px;
  right: 0;
`;
