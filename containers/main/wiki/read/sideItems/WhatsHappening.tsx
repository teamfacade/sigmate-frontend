import { memo, useState, useCallback, useRef, MouseEventHandler } from 'react';
import useSWR, { Fetcher } from 'swr';
import styled from 'styled-components';
import { darken } from 'polished';
import { CSSTransition } from 'react-transition-group';
import Axios from 'lib/global/axiosInstance';
import { Happened } from 'containers/main/wiki/read/sideItems';
import { MoreModal } from 'containers/main/wiki/read/sideItems/Modal';
import { SideItemWrapper } from 'components/main/wiki/read/sideItems';
import styles from 'styles/styleLib';
import { AxiosError } from 'axios';

type HappenedType = {
  opt: 't' | 'd';
  content: string;
  timestamp: string;
  contentId: string;
};

const WHFetcher: Fetcher<HappenedType[], string> = async (url) => {
  try {
    const res = await Axios.get(url);
    return res.data.data || [];
  } catch (e) {
    alert(
      `Error fetching what's happening. ERR: ${
        (e as AxiosError).response?.status
      }`
    );
    return [];
  }
};

type PropsType = {
  cid: number | null;
};

export default memo(function WhatsHappening({ cid }: PropsType) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { data: Happens } = useSWR(
    cid ? `/wh/ann?cid=${cid}` : null,
    cid ? WHFetcher : null
  );

  const onClickMore: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowModal(true),
    []
  );
  const onClickClose: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowModal(false),
    []
  );

  return (
    <>
      <SideItemWrapper header={"What's happening"}>
        {Happens && Happens.length > 0 && (
          <>
            {Happens.slice(0, 3).map((happen) => (
              <Happened
                key={happen.contentId}
                platform={happen.opt}
                timestamp={happen.timestamp}
                content={happen.content}
              />
            ))}
            <BtnWrapper>
              <MoreBtn onClick={onClickMore}>more...</MoreBtn>
            </BtnWrapper>
          </>
        )}
      </SideItemWrapper>
      <CSSTransition
        in={showModal}
        timeout={300}
        unmountOnExit
        classNames="show-modal"
        nodeRef={modalRef}
      >
        <MoreModal
          header={"What's happening"}
          onClick={onClickClose}
          ref={modalRef}
        />
      </CSSTransition>
    </>
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
