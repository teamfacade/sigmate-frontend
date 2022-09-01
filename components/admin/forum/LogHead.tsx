import { memo } from 'react';

export default memo(function LogHead() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Author</th>
        <th>Tag</th>
        <th>Post date</th>
        <th>Comments</th>
        <th>Manage</th>
      </tr>
    </thead>
  );
});
