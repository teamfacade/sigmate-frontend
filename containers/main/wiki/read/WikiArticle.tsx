import styled from 'styled-components';
import { ArticleType } from 'containers/main/wiki/edit/WikiEdit';
import { Title, ReadComponent } from 'components/main/wiki/read';

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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-left: 80px;
`;
