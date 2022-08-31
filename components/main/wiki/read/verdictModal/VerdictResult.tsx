import { memo, useMemo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  result: number;
};

export default memo(function VerdictResult({ result }: PropsType) {
  const resultMsg = useMemo(() => {
    if (result < 0) return 'WARNING';
    if (result > 0) return 'VERIFIED';
    return 'Neutral';
  }, [result]);

  return <Result result={result}>{resultMsg}</Result>;
});

const Result = styled.span<{ result: number }>`
  color: ${({ result }) => {
    if (result < 0) return styles.colors.warningColor;
    if (result > 0) return styles.colors.emphColor;
    return styles.colors.verdictModalTextColor;
  }};
  font-size: 14px;
  line-height: 140%;
  font-weight: 900;
`;
