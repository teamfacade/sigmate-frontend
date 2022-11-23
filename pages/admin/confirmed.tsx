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
  Modal,
} from 'components/global';
import { LogHead, LogItem } from 'components/admin/unconfirmed';

export default function Unconfirmed() {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<Admin.UnconfirmedType | null>(
    null
  );
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
            url: `/admin/collection/confirmed`,
          })
        ).then((action: any) => {
          const { status, data } = action.payload;
          if (status && status === 200) {
            setUnconfirmedList(data.data);
          } else {
            alert(`Error while fetching confirmed collections: ERR ${status}`);
            setUnconfirmedList([]);
          }
        }),
      500
    );
  }, [showModal]);

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
                  twitterHandle={collection.twitterHandle}
                  onClickManageBtn={onClick}
                />
              ))}
            </LogTable>
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
              alreadyConfirmed
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
