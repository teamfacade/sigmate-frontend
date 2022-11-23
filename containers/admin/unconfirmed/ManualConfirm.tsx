import {
  ChangeEventHandler,
  FormEventHandler,
  memo,
  useCallback,
  useState,
} from 'react';
import styled from 'styled-components';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { SectionWrapper } from 'components/global';
import { NamedInput, NameAndContent } from 'components/admin/global';
import { BlueBtnStyle } from 'styles/styleLib';

type PropsType = {
  id: number;
  name: string;
  discordUrl: string | null;
  twitterHandle: string | null;
  alreadyConfirmed: boolean;
};

export default memo(function ManualConfirm({
  id,
  name: collectionName,
  discordUrl: initDiscordUrl,
  twitterHandle: initTwitterHandle,
  alreadyConfirmed,
}: PropsType) {
  const dispatch = useAppDispatch();
  const [pending, setPending] = useState<boolean>(false);
  const [twitterHandle, setTwitterHandle] = useState<string>(
    initTwitterHandle || ''
  );
  const [discordUrl, setDiscordUrl] = useState<string>(initDiscordUrl || '');
  const [discordChannelId, setDiscordChannelId] = useState<string>('');

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'twitterHandle':
        setTwitterHandle(value);
        break;
      case 'discordUrl':
        setDiscordUrl(value);
        break;
      case 'discordChannelId':
        setDiscordChannelId(value);
        break;
      default:
        break;
    }
  }, []);

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
    setPending(true);
    console.log('SETPENDING');

    const { elements } = e.currentTarget;
    const TwitterHandle =
      (elements.namedItem('twitterHandle') as HTMLInputElement).value || '';
    const DiscordUrl =
      (elements.namedItem('discordUrl') as HTMLInputElement).value || '';
    const DiscordChannelId =
      (elements.namedItem('discordChannelId') as HTMLInputElement).value || '';

    dispatch(
      AuthRequiredAxios({
        method: alreadyConfirmed ? 'PUT' : 'POST',
        data: {
          collectionId: id,
          discordUrl: DiscordUrl,
          discordChannel: DiscordChannelId,
          twitterHandle: TwitterHandle,
        },
        url: alreadyConfirmed
          ? '/admin/collection/confirmed'
          : '/admin/collection/unconfirmed',
      })
    ).then((action: any) => {
      const { status } = action.payload;
      if (status === 200) {
        alert('Successfuly confirmed the collection info!');
      } else if (status === 500) {
        alert("Can't find twitter ID using given twitter handle.");
      } else if (status === 409) {
        alert("There's no collection corresponding to given collection id.");
      } else {
        alert(`Error while confirming the collection. ERR: ${status}`);
      }
      setPending(false);
    });
  }, []);

  return (
    <SectionWrapper header="WH manual confirm">
      <NameAndContent name="Collection Name" content={collectionName} />
      <NameAndContent name="Collection ID" content={id.toString(10)} />
      <form onSubmit={onSubmit}>
        <NamedInput
          name="Twitter handle"
          inputElemName="twitterHandle"
          type="text"
          value={twitterHandle}
          onChange={onChange}
        />
        <NamedInput
          name="Discord URL"
          inputElemName="discordUrl"
          type="text"
          value={discordUrl}
          onChange={onChange}
        />
        <NamedInput
          name="Discord Channel ID"
          inputElemName="discordChannelId"
          type="text"
          value={discordChannelId}
          onChange={onChange}
        />
        <ConfirmBtn type="submit" disabled={pending}>
          {pending ? 'This takes some time...' : 'Confirm'}
        </ConfirmBtn>
      </form>
    </SectionWrapper>
  );
});

const ConfirmBtn = styled.button`
  ${BlueBtnStyle};
  margin: 16px 0 0 0;
`;
