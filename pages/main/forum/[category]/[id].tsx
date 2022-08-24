import styled from 'styled-components';
import { ArticleContent, Comments } from 'containers/main/forum/article';
import styles from 'styles/styleLib';

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

export default function Article() {
  return (
    <>
      <Wrapper>
        <ArticleContent article={ExArticle} />
      </Wrapper>
      <Wrapper>
        <Comments />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  box-shadow: ${styles.shadows.containerShadow};
`;
