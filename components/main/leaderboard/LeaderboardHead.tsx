import { memo } from 'react';

export default memo(function LeaderboardHead() {
  return (
    <thead>
      <tr>
        <th>Ranking</th>
        <th>Name</th>
        <th>Referral</th>
        <th>Forum</th>
        <th>Edit</th>
        <th>Total Point</th>
      </tr>
    </thead>
  );
});
