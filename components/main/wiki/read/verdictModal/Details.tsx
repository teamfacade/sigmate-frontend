import { memo, useMemo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  verify: number;
  warning: number;
  name: string;
};

export default memo(function Details({ verify, warning, name }: PropsType) {
  const percentage = useMemo(() => {
    if (verify + warning === 0) return 50;
    if (name === 'Verify')
      return ((verify / (verify + warning)) * 100).toFixed(1);
    return ((warning / (verify + warning)) * 100).toFixed(1);
  }, [verify, warning, name]);

  return (
    <DetailsWrapper percentage={`${percentage}%`} name={name}>
      {name === 'Verify' ? (
        <Percentage name={name}>{`${percentage}% VERIFY`}</Percentage>
      ) : (
        <Percentage name={name}>{`WARNING ${percentage}%`}</Percentage>
      )}
      <Votes name={name}>{`${
        name === 'Verify' ? verify : warning
      } Votes`}</Votes>
    </DetailsWrapper>
  );
});

const DetailsWrapper = styled.div<{ percentage: string; name: string }>`
  flex: 1 1 ${({ percentage }) => percentage};
  border-top: 8px solid
    ${({ name }) =>
      name === 'Verify' ? styles.colors.emphColor : styles.colors.warningColor};
`;

const Percentage = styled.p<{ name: string }>`
  margin: 5px 0 0 0;
  color: ${({ name }) =>
    name === 'Verify' ? styles.colors.emphColor : styles.colors.warningColor};
  font-size: 12px;
  font-weight: 900;
  line-height: 140%;
  white-space: nowrap;
`;

const Votes = styled.p<{ name: string }>`
  margin: 0;
  color: ${({ name }) =>
    name === 'Verify' ? styles.colors.emphColor : styles.colors.warningColor};
  font-size: 12px;
  font-weight: 300;
  line-height: 140%;
`;
