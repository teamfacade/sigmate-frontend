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
  voted: string;
  commented?: boolean;
};

const Icons: StringKeyObj<typeof ThumbsUp> = {
  Verify: ThumbsUp,
  Warning,
  Comment,
  More,
};

const colors: ColorsType = {
  background: {
    Verify: styles.colors.lightThumbsUpColor,
    Warning: styles.colors.lightWarningColor,
    Comment: '#EEF7FF',
    More: 'transparent',
  },
  content: {
    Verify: styles.colors.emphColor,
    Warning: styles.colors.warningColor,
    Comment: '#377BFF',
    More: styles.colors.verdictModalTextColor,
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
    activate ? colors.content[name] : styles.colors.verdictModalTextColor};
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
        activate ? colors.content[name] : styles.colors.verdictModalTextColor};
    }
  }
`;

const BtnCompWrapper = styled.div`
  display: flex;
  align-items: center;
`;
