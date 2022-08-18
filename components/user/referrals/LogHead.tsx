import { memo } from 'react';

export default memo(function LogHead() {
  return (
    <thead>
      <tr>
        <th>Time(UTC)</th>
        <th>Username</th>
        <th>Amount</th>
      </tr>
    </thead>
  );
});
