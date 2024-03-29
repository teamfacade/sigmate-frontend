import { memo, useMemo } from 'react';
import convertDate from 'lib/global/convertDate';

type PropsType = {
  timestamp: string;
};

export default memo(function EditDate({ timestamp }: PropsType) {
  const time = useMemo(
    () => convertDate(new Date(timestamp), 'MonthDDYYYY', '/'),
    [timestamp]
  );

  return <p>{time}</p>;
});
