import { memo, FormEventHandler } from 'react';
import { MarketPlaceUrlInput, TokenInfoInput } from 'components/main/wiki/new';

type PropsType = {
  topic: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export default memo(function BasicInfos({ topic, onSubmit }: PropsType) {
  return (
    <div>
      {topic === 'Collection' && <MarketPlaceUrlInput onSubmit={onSubmit} />}
      {topic === 'Token' && <TokenInfoInput onSubmit={onSubmit} />}
    </div>
  );
});
