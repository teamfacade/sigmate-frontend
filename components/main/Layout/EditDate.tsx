import { memo, useMemo } from 'react';
import convertDate from 'hooks/convertDate';

type PropsType = {
  timestamp: number;
};

export default memo(function EditDate({ timestamp }: PropsType) {
  const time = useMemo(
    () => convertDate(new Date(timestamp), 'MMDDYYYY', '/'),
    [timestamp]
  );

  return <p>{time}</p>;
});
