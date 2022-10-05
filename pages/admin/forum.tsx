import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';
import useSWR, { Fetcher } from 'swr';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import Axios from 'lib/global/axiosInstance';
import {
  BasicWrapper,
  SectionWrapper,
  Search,
  LogTable,
  PageMoveBtns,
  Modal,
} from 'components/global';
import {
  LogHead,
  LogItem,
  CreateCategory,
  EditForumCategories,
} from 'components/admin/forum';
import { BlueBtnStyle } from 'styles/styleLib';

let total = 0;
const limit = 10;

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

const postsFetcher: Fetcher<Forum.PostType[], string> = async (url: string) => {
  try {
    const { status, data } = await Axios.get(url);
    if (status === 200) {
      total = data.forumPosts.length;
      return data.forumPosts;
    }
    return [];
  } catch (e) {
    alert(`Error while fetching posts: ERR ${e}`);
    return [];
  }
};

export default function ForumManagement() {
  const [showModal, setShowModal] = useState<string | null>(null);
  const [queryCategory, setQueryCategory] = useState<string | null>(null);
  const [curPage, setCurPage] = useState(1);
  const ModalRef = useRef<HTMLDivElement>(null);

  const { data: categories, mutate } = useSWR('/forum/c', categoriesFetcher);
  const { data: posts } = useSWR(
    queryCategory
      ? `forum/c/${queryCategory}/p?limit=${limit}&page=${curPage}`
      : null,
    queryCategory ? postsFetcher : null
  );

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => setShowModal(e.currentTarget.name),
    []
  );

  const onMouseDown: MouseEventHandler<HTMLDivElement> =
    useCallback(async () => {
      await mutate();
      setShowModal(null);
    }, [mutate]);

  const onSelectCategory: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      const { value } = e.currentTarget;
      setQueryCategory(value);
    },
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
              <select name="category" onChange={onSelectCategory}>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <span>Tags</span>
            <Search />
            <ManageBtnsWrapper>
              <ManageBtn name="Create" onClick={onClick}>
                Add new
              </ManageBtn>
              <ManageBtn name="Edit" onClick={onClick}>
                Edit Categories
              </ManageBtn>
            </ManageBtnsWrapper>
          </SectionWrapper>
        </BasicWrapper>
        <BasicWrapper>
          <SectionWrapper header="Search result">
            <LogTable gap="3vw">
              <LogHead />
              {posts?.map((article) => (
                <LogItem
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  category={queryCategory as string}
                  author={article.createdBy.userName as string}
                  tags={article.tags?.map((tag) => tag.name) || []}
                  date={article.createdAt as string}
                  comments={article.commentCount || 0}
                />
              ))}
            </LogTable>
            <PageMoveBtns
              onClickPageNumBtn={onClickPageNumBtn}
              onClickPageMoveBtn={onClickPageMoveBtn}
              totalPage={Math.floor(total / limit) + 1}
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
