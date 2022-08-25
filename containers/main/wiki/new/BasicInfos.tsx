import { memo, useCallback, FormEventHandler } from 'react';
import {
  SelectTypes,
  MarketPlaceUrlInput,
  TokenInfoInput,
} from 'components/main/wiki/new';

type PropsType = {
  topic: string;
};

export default memo(function BasicInfos({ topic }: PropsType) {
  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
    if (topic === 'Collection') {
      // eslint-disable-next-line no-alert
      alert(
        (
          e.currentTarget.elements.namedItem(
            'MarketPlaceUrl'
          ) as HTMLInputElement
        )?.value
      );
    } else if (topic === 'Token') {
      // eslint-disable-next-line no-console
      console.log(
        `Contract Address: ${ 
          (e.currentTarget.elements.namedItem('Address') as HTMLInputElement)
            ?.value}`
      );
      // eslint-disable-next-line no-console
      console.log(
        `Token ID: ${ 
          (e.currentTarget.elements.namedItem('ID') as HTMLInputElement)?.value}`
      );
    }
  }, []);

  return (
    <>
      <SelectTypes />
      {topic === 'Collection' && <MarketPlaceUrlInput onSubmit={onSubmit} />}
      {topic === 'Token' && <TokenInfoInput onSubmit={onSubmit} />}
    </>
  );
});
