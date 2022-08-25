import { memo } from 'react';
import styled from 'styled-components';
import { Content } from 'components/main/wiki/read/sideItems/modal';

/** EX */
type HappenedType = {
  id: number;
  platform: string;
  author: string;
  timestamp: string;
  content: string;
};

const ExHappen: HappenedType = {
  id: 1,
  platform: 'Discord',
  author: 'Limeahn',
  timestamp: new Date(Date.now()).toISOString(),
  content:
    'ece of classical Latin literature from 45 BC, making  over 2000 years old. \n' +
    'Richard McClintock, a Latin profes BC, making  over 2000 years  BC, making  over 2000 years  BC,rs old\n' +
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

const ExHappens: HappenedType[] = [
  ExHappen,
  { ...ExHappen, id: 2 },
  { ...ExHappen, platform: 'Twitter', id: 3 },
  { ...ExHappen, id: 4 },
  { ...ExHappen, id: 5 },
];

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
};

function isDebate(content: DebateType | HappenedType): content is DebateType {
  return (content as DebateType).PFPUrl !== undefined;
}

export default memo(function Contents({ header }: PropsType) {
  /* https://velog.io/@zeros0623/TypeScript-%EA%B3%A0%EA%B8%89-%ED%83%80%EC%9E%85#%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A0%95%EC%9D%98-%ED%83%80%EC%9E%85-%EA%B0%80%EB%93%9Cuser-defined-type-guards */
  const ExContents: HappenedType[] | DebateType[] =
    header === 'Debate' ? ExDebates : ExHappens;

  return (
    <ContentWrapper>
      {ExContents.map((content) => (
        <Content
          key={content.id}
          platform={isDebate(content) ? '' : content.platform}
          PFPUrl={isDebate(content) ? content.PFPUrl : ''}
          author={content.author}
          timestamp={content.timestamp}
          content={content.content}
        />
      ))}
    </ContentWrapper>
  );
});

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 510px;
  overflow: scroll;
`;
