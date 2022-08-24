import { memo, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ClipboardJS from 'clipboard';
import styles from 'styles/styleLib';
import { Etherium } from 'public/Icons/user/points';

export default memo(function UtilBtns() {
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
      <Btn>
        <div>
          <Etherium />
          <span>42 Comments</span>
        </div>
      </Btn>
      <Btn
        data-clipboard-text={`https://sigmate.io/main/forum/${router.query.category}/${router.query.id}`}
        ref={ShareBtnRef}
      >
        <div>
          <Etherium />
          <span>{copied ? 'URL Copied!' : 'Share'}</span>
        </div>
      </Btn>
      <Btn>
        <div>
          <Etherium />
          <span>Report</span>
        </div>
      </Btn>
      <Btn>
        <div>
          <Etherium />
          <span>Edit</span>
        </div>
      </Btn>
      <Btn>
        <div>
          <Etherium />
          <span>Delete</span>
        </div>
      </Btn>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const Btn = styled.button`
  padding: 5px;
  border-radius: 8px;
  border: none;
  background-color: transparent;
  color: ${styles.colors.forumSubTextColor};

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
`;
