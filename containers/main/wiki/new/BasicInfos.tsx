import { memo, FormEventHandler, Dispatch, SetStateAction } from 'react';
import { MarketPlaceUrlInput, TokenInfoInput } from 'components/main/wiki/new';

type PropsType = {
  topic: string;
  basicPending: boolean;
  basicFetched: Wiki.MarketplaceType;
  setBasicFetched: Dispatch<SetStateAction<Wiki.MarketplaceType>>;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export default memo(function BasicInfos({
  topic,
  basicPending,
  basicFetched,
  setBasicFetched,
  onSubmit,
}: PropsType) {
  return (
    <div style={{ marginBottom: '20px' }}>
      {topic === 'Collection' && (
        <MarketPlaceUrlInput
          basicPending={basicPending}
          basicFetched={basicFetched}
          setBasicFetched={setBasicFetched}
          onSubmit={onSubmit}
        />
      )}
      {topic === 'Token' && <TokenInfoInput onSubmit={onSubmit} />}
    </div>
  );
});
