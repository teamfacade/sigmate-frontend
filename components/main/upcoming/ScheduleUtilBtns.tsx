import { memo, MouseEventHandler, useCallback, useState } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  id: number;
  mintPageUrl?: string;
  AddToCalendar: (mintingId: string, subscribed: boolean) => void;
};

export default memo(function ScheduleUtilBtns({
  id,
  mintPageUrl,
  AddToCalendar,
}: PropsType) {
  const [pending, setPending] = useState<boolean>(false);
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const onClickAddToCalendar: MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        e.stopPropagation();
        const { mintingId } = e.currentTarget.dataset;
        if (mintingId) {
          setPending(true);
          AddToCalendar(mintingId, subscribed);
          setSubscribed((cur) => !cur);
          setPending(false);
        }
      },
      [AddToCalendar, subscribed]
    );

  return (
    <BtnWrapper>
      <AddCalenderBtn
        data-minting-id={id}
        disabled={pending}
        onClick={onClickAddToCalendar}
      >
        {pending ? '...' : subscribed ? 'Subscribed' : 'Add to Calendar'}
      </AddCalenderBtn>
      <a href={mintPageUrl} target="_blank" rel="noreferrer">
        <MintBtn
          disabled={mintPageUrl === undefined}
          onClick={(e) => e.stopPropagation()}
        >
          Mint
        </MintBtn>
      </a>
    </BtnWrapper>
  );
});

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 13px;

  button {
    border-radius: 8px;
    border: none;
    font-size: 15px;
    font-weight: 500;
    font-family: 'Inter', sans-serif;

    a {
      font-size: 15px;
      font-weight: 500;
      font-family: 'Inter', sans-serif;
    }
  }
`;

const AddCalenderBtn = styled.button`
  padding: 7px 30px;
  margin: 0;
  background-color: #e9f0ff;
  color: ${styles.colors.emphColor};
  white-space: nowrap;
  transition: background-color ease-in-out 300ms;

  :disabled {
    background-color: ${styles.colors.verdictModalTextColor};
  }
`;

const MintBtn = styled.button`
  padding: 7px 38px;
  margin: 0 0 0 10px;
  background-color: ${styles.colors.emphColor};
  color: #ffffff;

  :disabled {
    background-color: ${styles.colors.verdictModalTextColor};
  }
`;
