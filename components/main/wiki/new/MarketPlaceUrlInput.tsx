import { memo, FormEventHandler } from 'react';

type PropsType = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export default memo(function MarketPlaceUrlInput({ onSubmit }: PropsType) {
  return (
    <div>
      <h1>Marketplace Collection URL</h1>
      <form onSubmit={onSubmit}>
        <input
          type="url"
          name="MarketPlaceUrl"
          placeholder="https://opensea.io/collection/..."
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
});
