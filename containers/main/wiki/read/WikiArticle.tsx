import Link from 'next/link';
import styled from 'styled-components';
import { ArticleType } from 'containers/main/wiki/edit/WikiEdit';
import { Title, ReadComponent } from 'components/main/wiki/read';
import styles from 'styles/styleLib';

type PropsType = {
  article: ArticleType;
};

export default function WikiArticle({ article }: PropsType) {
  return (
    <Wrapper>
      <Title title={article.title} />
      {article.blocks.map((block) => {
        return (
          <ReadComponent
            key={block.id}
            tag={block.tag}
            content={block.content}
          />
        );
      })}
      <EditBtn>
        <Link href={`/main/wiki-edit/${article.title}`}>
          <a>Edit</a>
        </Link>
      </EditBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  padding-left: 80px;
`;

const EditBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 133px;
  height: 45px;
  border: none;
  border-radius: 8px;
  background-color: ${styles.colors.emphColor};
  font-size: 18px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;

  a {
    color: #ffffff;
  }
`;
