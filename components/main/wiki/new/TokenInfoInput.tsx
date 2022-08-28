import { memo, FormEventHandler } from 'react';

type PropsType = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export default memo(function TokenInfoInput({ onSubmit }: PropsType) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <h3>Contract address</h3>
          <input
            type="text"
            name="Address"
            placeholder="0x00...00"
            required
          />
          <h3>Token ID</h3>
          <input type="number" name="ID" placeholder="123" required />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
});
