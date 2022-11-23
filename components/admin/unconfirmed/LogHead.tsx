import { memo } from 'react';

export default memo(function LogHead() {
  return (
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Discord Url</th>
        <th>Twitter Handle</th>
        <th>Manage</th>
      </tr>
    </thead>
  );
});
