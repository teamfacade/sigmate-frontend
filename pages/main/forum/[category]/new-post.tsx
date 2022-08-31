import {
  useState,
  useCallback,
  ChangeEventHandler,
  FocusEventHandler,
} from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import styled from 'styled-components';
import { parseTags } from 'lib/main/forum/parseTags';
import { getPrevArticleContent } from 'lib/main/forum/getForumDatas';
import {
  SingleLineTextArea,
  MainContentTextArea,
} from 'components/main/forum/new';
import { WrapperStyle, BlueBtnStyle } from 'styles/styleLib';

export default function WritePost({
  title: prevTitle,
  content: prevContent,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [title, setTitle] = useState(prevTitle);
  const [content, setContent] = useState(prevContent);
  const [tag, setTag] = useState(tags.toString());

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    switch (e.currentTarget.name) {
      case 'Title':
        setTitle(e.currentTarget.value);
        break;
      case 'Content':
        setContent(e.currentTarget.value);
        break;
      case 'Tag':
        setTag(e.currentTarget.value);
        break;
      default:
        break;
    }
  }, []);

  const onBlurTagTextArea: FocusEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => setTag(parseTags(e.currentTarget.value).toString()),
    []
  );

  return (
    <Wrapper>
      <SingleLineTextArea name="Title" value={title} onChange={onChange} />
      <MainContentTextArea name="Content" value={content} onChange={onChange} />
      <SingleLineTextArea
        name="Tag"
        value={tag}
        onChange={onChange}
        onBlur={onBlurTagTextArea}
      />
      <BtnWrapper>
        <BlueBtn>Post</BlueBtn>
      </BtnWrapper>
    </Wrapper>
  );
}

// This gets called on every request
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  // Fetch data from external API
  const articleData = getPrevArticleContent(
    query?.category as string,
    query?.id as string | undefined
  );

  // Pass data to the page via props
  return { props: articleData };
}

const Wrapper = styled.div`
  ${WrapperStyle};
  width: 100%;
`;

const BtnWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  margin-top: 18px;
`;

const BlueBtn = styled.button`
  position: absolute;
  right: 0;
  ${BlueBtnStyle};
  padding: 9px 50px;
`;
