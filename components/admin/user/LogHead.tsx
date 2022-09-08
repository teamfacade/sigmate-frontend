import { memo } from 'react';

export default memo(function LogHead() {
  return (
    <thead>
      <tr>
        <th>name</th>
        <th>views</th>
        <th>edited users</th>
        <th>last edit</th>
        <th>manage</th>
      </tr>
    </thead>
  );
});
