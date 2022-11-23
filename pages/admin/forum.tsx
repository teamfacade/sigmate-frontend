import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
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
  initialSWRData,
} from 'components/global';
import {
  LogHead,
  LogItem,
  // CreateCategory,
  EditForumCategories,
} from 'components/admin/forum';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../hooks/reduxStoreHooks';

const limit = 10;

export const categoriesFetcher: Fetcher<
  CollectionCategoryType[],
  string
> = async (url: string) => {
  const { status, data } = await Axios.get(url);
  if (status === 200) {
    return data.categories || [];
  }
  alert(
    `Error while fetching collection categories: ERR ${status}.\r\nPlease reload the page.`
  );
  return [];
};

const postsFetcher: Fetcher<
  PagedSWRDataType<Forum.PostType[]>,
  string
> = async (url: string) => {
  try {
    const { status, data } = await Axios.get(url);
    if (status === 200) {
      return { data: data.forumPosts, total: data.forumPosts.length };
    }
    return initialSWRData;
  } catch (e) {
    alert(`Error while fetching posts: ERR ${e}`);
    return initialSWRData;
  }
};

export default function ForumManagement() {
  const router = useRouter();
  const [showModal, setShowModal] = useState<string | null>(null);
  const [queryCategory, setQueryCategory] = useState<string | null>(null);
  const [curPage, setCurPage] = useState(1);
  const ModalRef = useRef<HTMLDivElement>(null);
  const { isAdmin } = useAppSelector(({ account }) => account);

  useEffect(() => {
    if (!isAdmin) {
      router.back();
    }
  }, []);

  const { data: categories, mutate } = useSWR(
    `/wiki/collection/category`,
    categoriesFetcher
  );
  const { data: posts = initialSWRData } = useSWR(
    queryCategory
      ? `forum/c/${queryCategory}/p?limit=${limit}&page=${curPage}`
      : null,
    queryCategory ? postsFetcher : null
  );

  /*
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => setShowModal(e.currentTarget.name),
    []
  );
   */

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

  if (isAdmin)
    return (
      <>
        <Wrapper>
          <BasicWrapper>
            <SectionWrapper header="Forum articles">
              <div>
                <span>Category (지금은 forum 게시판 종류와 다름)</span>
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
            </SectionWrapper>
          </BasicWrapper>
          <BasicWrapper>
            <SectionWrapper header="Search result">
              <LogTable gap="3vw">
                <LogHead />
                {posts.data.map((article) => (
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
              {posts.total > 0 && (
                <PageMoveBtns
                  setCurPage={setCurPage}
                  totalPage={posts.total}
                  curPage={curPage}
                />
              )}
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
            <EditForumCategories />
          </Modal>
        </CSSTransition>
      </>
    );
  return <div>: P</div>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  div + div {
    margin-top: 20px;
  }
`;
