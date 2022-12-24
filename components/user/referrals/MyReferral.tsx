import { memo, useRef, useEffect, useState } from 'react';
import ClipboardJS from 'clipboard';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  refCode: string;
};

export default memo(function MyReferral({ refCode }: PropsType) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  let clipboard: ClipboardJS;
  let timeoutID: ReturnType<typeof setTimeout>;

  useEffect(() => {
    if (ref.current) {
      clipboard = new ClipboardJS(ref.current);
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
      <MyCode>{`My Code: ${refCode}`}</MyCode>
      <CopyBtn
        ref={ref}
        data-clipboard-text={`https://www.sigmate.io/auth?refCode=${refCode}`}
      >
        <p>{copied ? 'Copied!' : 'Copy My Referral'}</p>
      </CopyBtn>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  margin-bottom: 24px;
  border-radius: 8px;
  background-color: ${styles.colors.tableRowColor};
`;

const MyCode = memo(styled.p`
  padding-left: 24px;
  margin: 0;
  color: ${styles.colors.dimTextColor};
  font-size: 16px;
  font-weight: bold;
`);

const CopyBtn = styled.button`
  width: 200px;
  height: 30px;
  margin: 8px 8px 8px 32px;
  border: none;
  border-radius: 8px;
  background-color: ${styles.colors.emphColor};
  color: #ffffff;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;

  p {
    position: relative;
    top: -1px;
    margin: 0;
  }
`;
