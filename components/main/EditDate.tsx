import { memo } from 'react';

type PropsType = {
  dateString: number;
};

export default memo(function EditDate({ dateString }: PropsType) {
  const date = new Date(dateString);

  return (
    <p>
      {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
    </p>
  );
});
