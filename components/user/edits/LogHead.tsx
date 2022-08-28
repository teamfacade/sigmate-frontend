import { memo } from 'react';

export default memo(function LogHead() {
  return (
    <thead>
      <tr>
        <th>Name of Content</th>
        <th>Revision ID</th>
        <th>Edited Length</th>
        <th>Edit Detail</th>
        <th>Edit Time</th>
        <th>Approval</th>
      </tr>
    </thead>
  );
});
