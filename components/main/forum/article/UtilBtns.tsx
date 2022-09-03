import { memo, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ClipboardJS from 'clipboard';
import styles from 'styles/styleLib';

type PropsType = {
  onClickReport: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function UtilBtns({ onClickReport }: PropsType) {
  const [copied, setCopied] = useState(false);
  const ShareBtnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  let clipboard: ClipboardJS;
  let timeoutID: ReturnType<typeof setTimeout>;

  useEffect(() => {
    if (ShareBtnRef.current) {
      clipboard = new ClipboardJS(ShareBtnRef.current);
      clipboard.on('success', () => {
        setCopied(true);
        timeoutID = setTimeout(() => setCopied(false), 3000);
      });
      clipboard.on('error', () => {
        // eslint-disable-next-line no-alert
        alert('Unexpected error occurred.\r\nPlease try again.');
      });
    }

    return () => {
      clearTimeout(timeoutID);
      clipboard.destroy();
    };
  }, []);

  return (
    <Wrapper>
      <a
        href={`/main/forum/${router.query.category}/${router.query.id}#comments`}
      >
        <Btn>
          <div>
            <span>42 Comments</span>
          </div>
        </Btn>
      </a>
      <Btn
        data-clipboard-text={`https://sigmate.io/main/forum/${router.query.category}/${router.query.id}`}
        ref={ShareBtnRef}
      >
        <div>
          <span>{copied ? 'URL Copied!' : 'Share'}</span>
        </div>
      </Btn>
      <Btn onClick={onClickReport}>
        <div>
          <span>Report</span>
        </div>
      </Btn>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-right: 10px;
  }
`;

const Btn = styled.button`
  padding: 5px 20px;
  border-radius: 8px;
  border: 1px solid ${styles.colors.lightGrayBorderColor};
  background-color: transparent;
  color: ${styles.colors.forumSubTextColor};
  box-shadow: ${styles.shadows.containerShadow};

  & + & {
    margin-left: 10px;
  }

  :hover {
    background-color: ${styles.colors.tableRowColor};
  }

  div {
    display: flex;
    align-items: center;
  }

  span {
    white-space: nowrap;
  }
`;
