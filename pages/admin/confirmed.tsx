import {
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { ManualConfirm } from 'containers/admin/unconfirmed';
import {
  BasicWrapper,
  SectionWrapper,
  LogTable,
  Modal,
  PageMoveBtns,
} from 'components/global';
import { LogHead, LogItem } from 'components/admin/unconfirmed';
import { useRouter } from 'next/router';

export default function Unconfirmed() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<Admin.UnconfirmedType | null>(
    null
  );
  const [unconfirmedList, setUnconfirmedList] = useState<
    Admin.UnconfirmedType[]
  >([]);
  const [curPage, setCurPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const ModalRef = useRef<HTMLDivElement>(null);
  const { isAdmin } = useAppSelector(({ account }) => account);

  useEffect(() => {
    if (!isAdmin) {
      router.back();
    }
  }, []);

  useEffect(() => {
    /** Wait for the auth state restoring */
    setTimeout(
      () =>
        dispatch(
          AuthRequiredAxios({
            method: 'GET',
            url: `/admin/collection/confirmed?page=${curPage}&limit=30`,
          })
        ).then((action: any) => {
          const { status, data } = action.payload;
          if (status && status === 200) {
            setTotalPage(data.page.total);
            setUnconfirmedList(data.data);
          } else {
            alert(`Error while fetching confirmed collections: ERR ${status}`);
            setUnconfirmedList([]);
          }
        }),
      500
    );
  }, [curPage, showModal]);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    const { id, name, discordUrl, twitterHandle, discordChannel, accountId } =
      e.currentTarget.dataset;

    if (id && name)
      setShowModal({
        id: parseInt(id, 10),
        name,
        discordUrl: discordUrl || null,
        twitterHandle: twitterHandle || null,
        channel: {
          discordChannel: discordChannel || '',
          account: {
            id: parseInt(accountId || '1', 10),
          },
        },
      });
  }, []);

  const onMouseDown: MouseEventHandler<HTMLDivElement> =
    useCallback(async () => {
      setShowModal(null);
    }, []);

  if (isAdmin)
    return (
      <>
        <Wrapper>
          <BasicWrapper>
            <SectionWrapper header="Confirmed collections">
              <LogTable gap="5vw">
                <LogHead />
                {unconfirmedList?.map((collection) => (
                  <LogItem
                    key={collection.id}
                    id={collection.id}
                    name={collection.name}
                    discordUrl={collection.discordUrl}
                    discordChannel={collection.channel?.discordChannel || null}
                    twitterHandle={collection.twitterHandle}
                    accountId={collection.channel?.account.id || null}
                    onClickManageBtn={onClick}
                  />
                ))}
              </LogTable>
              {totalPage > 0 && (
                <PageMoveBtns
                  totalPage={totalPage}
                  curPage={curPage}
                  setCurPage={setCurPage}
                />
              )}
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
                discordChannel={showModal.channel?.discordChannel || null}
                accountId={showModal.channel?.account.id || null}
                alreadyConfirmed
              />
            )}
          </Modal>
        </CSSTransition>
      </>
    );
  return <div>: P</div>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  div + div {
    margin-top: 20px;
  }
`;
