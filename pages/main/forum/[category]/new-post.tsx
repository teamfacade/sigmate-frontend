import {
  useState,
  useCallback,
  useEffect,
  useRef,
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
} from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
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
  articleID,
  error = false,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector(({ account }) => account);
  const [title, setTitle] = useState(prevTitle);
  const [content, setContent] = useState(prevContent);
  const [tag, setTag] = useState(tags.toString());
  const titleRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (error)
      alert(
        'Something went wrong!\r\nFailed to load article contents.\r\nPlease try again.'
      );
    if (router.query.category === '24' && !isAdmin) router.back();
  }, []);

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

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (title === '') titleRef.current?.focus();
    else {
      dispatch(
        AuthRequiredAxios({
          method: articleID ? 'PATCH' : 'POST',
          url: articleID ? `/forum/p/${articleID}` : '/forum/p',
          data: {
            title,
            content,
            categories: [Number.parseInt(router.query.category as string, 10)],
            tags: tag.split(',').filter((t) => t.length > 0),
          },
        })
      ).then((action: any) => {
        if (action.payload.status === (articleID ? 200 : 201))
          router.push(
            `/main/forum/${router.query.category}/${action.payload.data.forumPost.id}`
          );
        else alert('Something went wrong!\r\nPlease try again.');
      });
    }
  }, [title, content, tag, articleID]);

  return (
    <Wrapper>
      <SingleLineTextArea
        name="Title"
        value={title}
        onChange={onChange}
        ref={titleRef}
      />
      <MainContentTextArea name="Content" value={content} onChange={onChange} />
      <SingleLineTextArea
        name="Tag"
        value={tag}
        onChange={onChange}
        onBlur={onBlurTagTextArea}
      />
      <BtnWrapper>
        <BlueBtn onClick={onClick}>
          {articleID !== undefined ? 'Save' : 'Post'}
        </BlueBtn>
      </BtnWrapper>
    </Wrapper>
  );
}

// This gets called on every request
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  // Fetch data from external API
  const articleData = getPrevArticleContent(query?.id as string | undefined);

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
