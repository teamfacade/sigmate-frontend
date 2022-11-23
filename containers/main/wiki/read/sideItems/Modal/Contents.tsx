import {
  useState,
  useCallback,
  useRef,
  MouseEventHandler,
  useEffect,
} from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import { WHFetcher } from 'containers/main/wiki/read/sideItems/WhatsHappening';
import {
  Content,
  DebateInput,
} from 'components/main/wiki/read/sideItems/modal';

/** EX */
type DebateType = {
  id: number;
  PFPUrl: string;
  author: string;
  timestamp: string;
  content: string;
};

const ExDebate: DebateType = {
  id: 1,
  PFPUrl: '',
  author: 'Limeahn',
  timestamp: new Date(Date.now()).toISOString(),
  content:
    'ece \n' +
    'of classical Latin literature from 45 BC, making over 2000 years old, Richard McClintock, a Latin profes BC, making  over 2000 years  BC, making  over 2000 years  BC,rs old' +
    'ece of classical Latin literature from 45 BC, making  over 200chard McClintock, a Latin profes BC, making  over 2000 years  BC, making  over 2000 years  BC,rs oldece of classical Latin literature from 45 BC, making  over 2000 years old. \n' +
    '\n' +
    'Richard McClintock, a Latin profes BC, making  over 2000 years  BC, making  over 2000 years  BC,rs oldece of class00 years  BC,rs oldece of classical Latin literature from 45 BC, making  over 2000 years old. \n' +
    '\n' +
    'Richard McClintock, a Latin profes BC, making  over 2000 years  BC, making  over 2000 years  BC,rs oldece of classical Latin literature from 45 BC, making  over 2000 years old. Richard McClintock, a Latin profes BC, making  ovever 2000 years  BC,rs oldece of classical Latin literature from 45 BC, making  over 2000 years old. ichard McClintock, a Latin profes BC, making  over 2000 years  BC, making  over 2000 years  BC,rs old\n' +
    '\n' +
    'oldece of classical Latin literature from 45 BC, making  over 2000 years old. Richard McClintock, a Latin profes BC, making  ovever 2000 years  BC,rs oldece of classical Latin literature from 45 BC, making  over 2000 years old. ichard McClintock, a Latin profes BC, making  over 2000 years  BC, ma king  over 2000 years  BC,rs old\n' +
    '\n' +
    ' ichard McClintock, a Latin profes BC, making  over 2000 years  BC, making  over 2000 years  BC,rs old',
};

const ExDebates: DebateType[] = [
  ExDebate,
  { ...ExDebate, id: 2 },
  { ...ExDebate, id: 3 },
  { ...ExDebate, id: 4 },
  { ...ExDebate, id: 5 },
];
/** EX ends */

type PropsType = {
  header: string;
  cid?: number | null;
};

function isDebate(
  content: DebateType | Wiki.HappenedType
): content is DebateType {
  return (content as DebateType).PFPUrl !== undefined;
}

let timeoutID: ReturnType<typeof setTimeout>;
let debouncing = false;

export default (function Contents({ header, cid }: PropsType) {
  /* https://velog.io/@zeros0623/TypeScript-%EA%B3%A0%EA%B8%89-%ED%83%80%EC%9E%85#%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A0%95%EC%9D%98-%ED%83%80%EC%9E%85-%EA%B0%80%EB%93%9Cuser-defined-type-guards */
  const [contents, setContents] = useState<Wiki.HappenedType[] | DebateType[]>(
    header === 'Debate' ? ExDebates : []
  );
  const [curPage, setCurPage] = useState<number>(1);

  const { data: curPageContents } = useSWR(
    header !== 'Debate' && cid
      ? `/wh/ann?cid=${cid}&limit=${5}&page=${curPage}`
      : null,
    header !== 'Debate' && cid ? WHFetcher : null,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  /** SWR로 받아온 데이터 concat */
  useEffect(() => {
    if (curPageContents && curPageContents.length > 0) {
      setContents((current) => {
        if (header === 'Debate')
          return (current as DebateType[]).concat(ExDebates);
        if (
          current.length === 0 ||
          (current as Wiki.HappenedType[])[0]?.contentId !==
            curPageContents[0].contentId
        )
          return (current as Wiki.HappenedType[]).concat(curPageContents);
        return current;
      });
    }
  }, [curPageContents]);

  useEffect(() => {
    return () => clearTimeout(timeoutID);
  }, []);

  const debateInputRef = useRef<HTMLTextAreaElement>(null);

  /** 무한 스크롤을 logical pagination으로 구현 */
  const onScroll: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const { scrollHeight, scrollTop } = e.currentTarget;
      if (
        scrollHeight - scrollTop < 515 &&
        (curPageContents === undefined || curPageContents.length > 0) &&
        !debouncing
      ) {
        debouncing = true;
        if (header === 'Debate')
          setContents((current) => {
            return (current as DebateType[]).concat(ExDebates);
          });
        else setCurPage((cur) => cur + 1);
        timeoutID = setTimeout(() => {
          debouncing = false;
        }, 500);
      }
    },
    [header, curPageContents, debouncing]
  );

  const onClickWrite: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (debateInputRef.current) {
      const newOpinion: DebateType = {
        id: Date.now(),
        PFPUrl: '',
        author: 'WK SEO',
        timestamp: new Date(Date.now()).toISOString(),
        content: debateInputRef.current.value || '',
      };

      debateInputRef.current.value = '';

      setContents((current) => {
        return [newOpinion].concat(current as DebateType[]);
      });
    }
  }, [contents]);

  return (
    <>
      {header === 'Debate' && (
        <DebateInput onClick={onClickWrite} ref={debateInputRef} />
      )}
      <ContentWrapper hasDebateInput={header === 'Debate'} onScroll={onScroll}>
        {contents.length > 0 &&
          contents.map((content) =>
            isDebate(content) ? (
              <Content
                key={content.id}
                header={header}
                platform=""
                PFPUrl={content.PFPUrl}
                author={content.author}
                timestamp={content.timestamp}
                content={content.content}
              />
            ) : (
              <Content
                key={content.contentId}
                header={header}
                platform={content.opt}
                PFPUrl={null}
                author={null}
                timestamp={content.timestamp}
                content={content.content}
              />
            )
          )}
      </ContentWrapper>
    </>
  );
});

const ContentWrapper = styled.div<{ hasDebateInput: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 510px;
  padding-top: ${({ hasDebateInput }) => (hasDebateInput ? '55px' : 0)};
  overflow: auto;
`;
