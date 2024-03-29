import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { ThumbsUp, Warning } from 'public/Icons/main/wiki/read';
import styles from 'styles/styleLib';

type ColorsType = {
  background: {
    normal: StringKeyObj<string>;
    activated: StringKeyObj<string>;
  };
  content: {
    normal: StringKeyObj<string>;
    activated: StringKeyObj<string>;
  };
};

type PropsType = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  name: 'Verify' | 'Warning';
  isUpvote: boolean | null;
};

const Icons: StringKeyObj<typeof ThumbsUp> = {
  Verify: ThumbsUp,
  Warning,
};

const colors: ColorsType = {
  background: {
    normal: {
      Verify: styles.colors.lightThumbsUpColor,
      Warning: styles.colors.lightWarningColor,
    },
    activated: {
      Verify: styles.colors.emphColor,
      Warning: styles.colors.warningColor,
    },
  },
  content: {
    normal: {
      Verify: styles.colors.emphColor,
      Warning: styles.colors.warningColor,
    },
    activated: {
      Verify: '#EDF2F2',
      Warning: '#F5F0F0',
    },
  },
};

export default memo(function VerdictBtn({
  onClick,
  name,
  isUpvote,
}: PropsType) {
  const Icon = Icons[name];

  return (
    <Btn
      name={name}
      activate={
        (isUpvote && name === 'Verify') ||
        (isUpvote === false && name === 'Warning')
      }
      onClick={onClick}
    >
      <BtnCompWrapper>
        <Icon />
        <p>{name === 'Verify' ? 'VERIFY' : 'BE AWARE'}</p>
      </BtnCompWrapper>
    </Btn>
  );
});

const Btn = styled.button<{ activate: boolean; name: string }>`
  flex: 1 1 auto;
  width: 190px;
  padding: 8px 0;
  margin: 0;
  border: none;
  border-radius: 8px;
  background-color: ${({ activate, name }) =>
    activate
      ? colors.background.activated[name]
      : colors.background.normal[name]};
  color: ${({ activate, name }) =>
    activate ? colors.content.activated[name] : colors.content.normal[name]};
  cursor: pointer;

  & + & {
    margin-left: 13px;
  }

  :hover {
    background-color: ${({ name }) => colors.background.activated[name]};
    color: ${({ name }) => colors.content.activated[name]};

    svg {
      path {
        fill: ${({ name }) => colors.content.activated[name]};
      }
    }
  }

  p {
    margin: 0 0 0 14px;
    font-size: 20px;
    font-weight: 700;
    line-height: 140%;
    font-family: 'Inter', sans-serif;
  }

  svg {
    transform: scale(1.5);

    path {
      fill: ${({ activate, name }) =>
        activate
          ? colors.content.activated[name]
          : colors.content.normal[name]};
    }
  }
`;

const BtnCompWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
