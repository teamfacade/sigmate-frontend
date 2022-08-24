import { MouseEventHandler, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Search, PageMoveBtns } from 'components/global';
import { ArticleThumbnail } from 'containers/main/forum/articleList';
import { PostBtn } from 'components/main/forum/articleList';

type ArticleType = {
  id: number;
  category: string;
  recommend: number;
  author: string;
  tags: string[];
  timestamp: string;
  title: string;
  content: string;
  imageURL: string;
};

const ExArticle: ArticleType = {
  id: 1,
  category: 'Game',
  recommend: 322,
  author: 'WK SEO',
  tags: ['NFT', 'Bellybear'],
  timestamp: new Date(Date.now()).toISOString(),
  title:
    'An ‘NFT’ digital image just sold for US$69 million \n' +
    '— but what is it?',
  content:
    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000\n\n Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000 Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literatur',
  imageURL: '',
};

const ExAtricles: ArticleType[] = [
  ExArticle,
  { ...ExArticle, id: 2 },
  { ...ExArticle, id: 3 },
  { ...ExArticle, id: 4 },
];
const total = 42;

export default function ArticleLists() {
  const [curPage, setCurPage] = useState(1);
  const router = useRouter();

  const onClickPageNumBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setCurPage(parseInt(e.currentTarget.value, 10));
      // eslint-disable-next-line no-alert
      alert(
        `Fetch 4 articles from ${
          (parseInt(e.currentTarget.value, 10) - 1) * 4
        }th`
      );
    },
    []
  );

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          // eslint-disable-next-line no-alert
          alert(`Fetch 4 articles from 0th`);
          setCurPage(1);
          break;
        case 'Prev':
          // eslint-disable-next-line no-alert
          alert(`Fetch 4 articles from ${(curPage - 1 - 1) * 4}th`);
          setCurPage((cur) => cur - 1);
          break;
        case 'Next':
          // eslint-disable-next-line
          alert(`Fetch 4 articles from ${curPage * 4}th`);
          setCurPage((cur) => cur + 1);
          break;
        case 'ToLast':
          // eslint-disable-next-line
          alert(`Fetch 4 articles from ((total / 4) * 4)th`);
          setCurPage(Math.floor(total / 4) + 1);
          break;
        default:
          break;
      }
    },
    [curPage]
  );

  return (
    <>
      <UtilWrapper>
        <Search white placeholder="Search..." />
        {router.query.category !== 'Best' && (
          <PostBtn category={router.query.category as string} />
        )}
      </UtilWrapper>
      {ExAtricles.map((article) => (
        <ArticleThumbnail
          key={article.id}
          id={article.id}
          category={article.category}
          recommend={article.recommend}
          author={article.author}
          tags={article.tags}
          timestamp={article.timestamp}
          title={article.title}
          content={article.content}
          imageURL={article.imageURL}
        />
      ))}
      <PageMoveBtns
        totalPage={total}
        curPage={curPage}
        onClickPageNumBtn={onClickPageNumBtn}
        onClickPageMoveBtn={onClickPageMoveBtn}
      />
    </>
  );
}

const UtilWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
