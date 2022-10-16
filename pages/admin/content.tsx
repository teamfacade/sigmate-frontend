import { MouseEventHandler, useCallback, useRef, useState } from 'react';
import useSWR, { Fetcher } from 'swr';
import styled from 'styled-components';
import Axios from 'lib/global/axiosInstance';
import {
  BasicWrapper,
  SectionWrapper,
  Search,
  LogTable,
  PageMoveBtns,
  Modal,
} from 'components/global';
import { LogHead, LogItem } from 'components/admin/content';
import { CSSTransition } from 'react-transition-group';
import {
  CreateCategory,
  EditForumCategories,
} from '../../components/admin/forum';
import { BlueBtnStyle } from '../../styles/styleLib';

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

const categoriesFetcher: Fetcher<Forum.CategoryType[], string> = async (
  url: string
) => {
  try {
    const { status, data } = await Axios.get(url);
    if (status === 200) {
      return data.categories;
    }
    return [];
  } catch (e) {
    alert(`Error while fetching categories: ERR ${e}`);
    return [];
  }
};

export default function ContentManagement() {
  const [showModal, setShowModal] = useState<string | null>(null);
  const [curPage, setCurPage] = useState(1);
  const ModalRef = useRef<HTMLDivElement>(null);

  const { data: groups, mutate } = useSWR('/forum/c', categoriesFetcher);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => setShowModal(e.currentTarget.name),
    []
  );

  const onMouseDown: MouseEventHandler<HTMLDivElement> =
    useCallback(async () => {
      await mutate();
      setShowModal(null);
    }, [mutate]);

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
          <SectionWrapper header="Article list">
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ marginRight: '4px' }}>Group</span>
              <select name="group">
                {groups?.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            <span>Title</span>
            <Search />
            <ManageBtnsWrapper>
              <ManageBtn name="Create" onClick={onClick}>
                Add new group
              </ManageBtn>
              <ManageBtn name="Edit" onClick={onClick}>
                Edit groups
              </ManageBtn>
            </ManageBtnsWrapper>
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
      <CSSTransition
        in={showModal !== null}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
        nodeRef={ModalRef}
      >
        <Modal onMouseDown={onMouseDown} ref={ModalRef}>
          {showModal === 'Create' ? (
            <CreateCategory />
          ) : (
            <EditForumCategories />
          )}
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

const ManageBtnsWrapper = styled.div`
  position: absolute;
  top: -10px;
  right: 0;
  display: flex;
`;

const ManageBtn = styled.button`
  ${BlueBtnStyle};

  & + & {
    margin-left: 8px;
  }
`;
