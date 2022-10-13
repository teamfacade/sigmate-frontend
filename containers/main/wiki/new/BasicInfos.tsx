import { memo, FormEventHandler } from 'react';
import { MarketPlaceUrlInput, TokenInfoInput } from 'components/main/wiki/new';

type PropsType = {
  topic: string;
  basicPending: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export default memo(function BasicInfos({
  topic,
  basicPending,
  onSubmit,
}: PropsType) {
  return (
    <div>
      {topic === 'Collection' && (
        <MarketPlaceUrlInput basicPending={basicPending} onSubmit={onSubmit} />
      )}
      {topic === 'Token' && <TokenInfoInput onSubmit={onSubmit} />}
    </div>
  );
});
