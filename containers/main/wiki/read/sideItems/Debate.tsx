import { memo } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { DebateItem } from 'containers/main/wiki/read/sideItems';
import { SideItemWrapper } from 'components/main/wiki/read/sideItems';
import styles from 'styles/styleLib';

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

const ExDebates: DebateType[] = [
  ExDebate,
  { ...ExDebate, id: 2 },
  { ...ExDebate, id: 3 },
  { ...ExDebate, id: 4 },
  { ...ExDebate, id: 5 },
];

type PropsType = {
  title: string;
};

export default memo(function Debate({ title }: PropsType) {
  // eslint-disable-next-line
  console.log(`Debate at ${title}`);

  return (
    <SideItemWrapper header="Debate">
      {ExDebates.slice(0, 3).map((debate, idx) => (
        <DebateItem
          key={debate.id}
          index={idx}
          PFPUrl={debate.PFPUrl}
          author={debate.author}
          timestamp={debate.timestamp}
          content={debate.content}
        />
      ))}
      <BtnWrapper>
        <MoreBtn>more...</MoreBtn>
      </BtnWrapper>
    </SideItemWrapper>
  );
});

const BtnWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 17px;
  margin-top: 8px;
`;

const MoreBtn = styled.button`
  position: absolute;
  right: 0;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  color: ${styles.colors.emphColor};
  font-size: 14px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  cursor: pointer;

  :hover,
  :active {
    color: ${darken(0.3, styles.colors.emphColor)};
  }
`;
