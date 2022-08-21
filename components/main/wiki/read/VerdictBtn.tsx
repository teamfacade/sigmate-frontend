import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { ThumbsUp, Warning, Comment, More } from 'public/Icons/main/wiki/read';
import styles from 'styles/styleLib';

interface StringKeyObj<T> {
  [index: string]: T;
}

type ColorsType = {
  background: StringKeyObj<string>;
  content: StringKeyObj<string>;
};

type PropsType = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  name: string;
  content?: string;
  voted: 'ThumbsUp' | 'Warning' | '';
  commented?: boolean;
};

const Icons: StringKeyObj<typeof ThumbsUp> = {
  ThumbsUp,
  Warning,
  Comment,
  More,
};

const colors: ColorsType = {
  background: {
    ThumbsUp: '#EEF7FF',
    Warning: '#FBEFEF',
    Comment: '#EEF7FF',
    More: 'transparent',
  },
  content: {
    ThumbsUp: styles.colors.emphColor,
    Warning: '#DC2626',
    Comment: '#377BFF',
    More: '#727272',
  },
};

export default memo(function VerdictBtn({
  onClick,
  name,
  content,
  voted,
  commented,
}: PropsType) {
  const Icon = Icons[name];

  return (
    <Btn
      name={name}
      activate={voted === name || (name === 'Comment' && !!commented)}
      onClick={onClick}
    >
      <BtnCompWrapper>
        <Icon />
        <p>{content || ''}</p>
      </BtnCompWrapper>
    </Btn>
  );
});

const Btn = styled.button<{ activate: boolean; name: string }>`
  flex: 0 0 auto;
  height: 28px;
  padding: 5px 8px 6px 8px;
  border-radius: 8px;
  border: none;
  background-color: ${({ activate, name }) =>
    activate ? colors.background[name] : 'transparent'};
  color: ${({ activate, name }) =>
    activate ? colors.content[name] : '#727272'};
  cursor: pointer;

  :hover {
    background-color: ${({ name }) => colors.background[name]};
    color: ${({ name }) => colors.content[name]};

    svg {
      path {
        fill: ${({ name }) => colors.content[name]};
      }
    }
  }

  p {
    color: inherit;
    margin: 0 0 0 8px;
  }

  svg {
    path {
      fill: ${({ activate, name }) =>
        activate ? colors.content[name] : '#727272'};
    }
  }
`;

const BtnCompWrapper = styled.div`
  display: flex;
  align-items: center;
`;
