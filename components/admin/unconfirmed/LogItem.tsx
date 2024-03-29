import { memo, MouseEventHandler } from 'react';

type PropsType = {
  id: number;
  name: string;
  discordUrl: string | null;
  discordChannel: string | null;
  twitterHandle: string | null;
  accountId?: number | null;
  onClickManageBtn: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function LogItem({
  id,
  name,
  discordUrl,
  discordChannel,
  twitterHandle,
  accountId,
  onClickManageBtn,
}: PropsType) {
  return (
    <tbody>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{discordUrl || ''}</td>
        <td>{twitterHandle || ''}</td>
        <td>
          <button
            type="button"
            data-id={id}
            data-name={name}
            data-discord-url={discordUrl}
            data-discord-channel={discordChannel}
            data-twitter-handle={twitterHandle}
            data-account-id={accountId}
            onClick={onClickManageBtn}
          >
            Manage
          </button>
        </td>
      </tr>
    </tbody>
  );
});
