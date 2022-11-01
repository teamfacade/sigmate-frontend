import {
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { ManualConfirm } from 'containers/admin/unconfirmed';
import {
  BasicWrapper,
  SectionWrapper,
  LogTable,
  PageMoveBtns,
  Modal,
} from 'components/global';
import { LogHead, LogItem } from 'components/admin/unconfirmed';

const total = 0;

export default function Unconfirmed() {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<Admin.UnconfirmedType | null>(
    null
  );
  const [curPage, setCurPage] = useState(1);
  const [unconfirmedList, setUnconfirmedList] = useState<
    Admin.UnconfirmedType[]
  >([]);
  const ModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /** Wait for the auth state restoring */
    setTimeout(
      () =>
        dispatch(
          AuthRequiredAxios({
            method: 'GET',
            url: `/admin/uc?limit=10&page=${curPage}`,
          })
        ).then((action: any) => {
          const { status, data } = action.payload;
          if (status && status === 200) {
            setUnconfirmedList(data.collections);
          } else {
            alert(
              `Error while fetching unconfirmed collections: ERR ${status}`
            );
            setUnconfirmedList([]);
          }
        }),
      500
    );
  }, [showModal, curPage]);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    const { id, name, discordUrl, twitterHandle } = e.currentTarget.dataset;
    if (id && name)
      setShowModal({
        id: parseInt(id, 10),
        name,
        discordUrl: discordUrl || null,
        twitterHandle: twitterHandle || null,
      });
  }, []);

  const onMouseDown: MouseEventHandler<HTMLDivElement> =
    useCallback(async () => {
      setShowModal(null);
    }, []);

  const onClickPageNumBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setCurPage(parseInt(e.currentTarget.value, 10));
      // eslint-disable-next-line no-alert
      alert(
        `Fetch 10 referral logs from ${
          (parseInt(e.currentTarget.value, 10) - 1) * 10
        }th log`
      );
    },
    []
  );

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          // eslint-disable-next-line no-alert
          alert(`Fetch 10 referral logs from 0th log`);
          setCurPage(1);
          break;
        case 'Prev':
          // eslint-disable-next-line no-alert
          alert(`Fetch 10 referral logs from ${(curPage - 1 - 1) * 10}th log`);
          setCurPage((cur) => cur - 1);
          break;
        case 'Next':
          // eslint-disable-next-line
          alert(`Fetch 10 referral logs from ${curPage * 10}th log`);
          setCurPage((cur) => cur + 1);
          break;
        case 'ToLast':
          // eslint-disable-next-line
          alert(`Fetch 10 referral logs from ((total / 10) * 10)th log`);
          setCurPage(Math.floor(total / 10) + 1);
          break;
        default:
          break;
      }
    },
    [curPage]
  );

  return (
    <>
      <Wrapper>
        <BasicWrapper>
          <SectionWrapper header="Unconfirmed collections">
            <LogTable gap="5vw">
              <LogHead />
              {unconfirmedList?.map((collection) => (
                <LogItem
                  key={collection.id}
                  id={collection.id}
                  name={collection.name}
                  discordUrl={collection.discordUrl}
                  twitterHandle={collection.twitterHandle}
                  onClickManageBtn={onClick}
                />
              ))}
            </LogTable>
            <PageMoveBtns
              onClickPageNumBtn={onClickPageNumBtn}
              onClickPageMoveBtn={onClickPageMoveBtn}
              totalPage={total}
              curPage={curPage}
            />
          </SectionWrapper>
        </BasicWrapper>
      </Wrapper>
      <CSSTransition
        in={showModal !== null}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
        nodeRef={ModalRef}
      >
        <Modal onMouseDown={onMouseDown} ref={ModalRef}>
          {showModal !== null && (
            <ManualConfirm
              id={showModal.id}
              name={showModal.name}
              discordUrl={showModal.discordUrl}
              twitterHandle={showModal.twitterHandle}
            />
          )}
        </Modal>
      </CSSTransition>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  div + div {
    margin-top: 20px;
  }
`;
