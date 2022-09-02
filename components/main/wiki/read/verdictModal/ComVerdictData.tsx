import { memo, useMemo } from 'react';
import styled from 'styled-components';
import { Details, VerdictResult } from 'components/main/wiki/read/verdictModal';
import styles from 'styles/styleLib';

type PropsType = {
  show: boolean;
  verdict: VerdictType;
};

export default memo(function ComVerdictData({ show, verdict }: PropsType) {
  const result = useMemo(() => {
    if (verdict) return verdict.verify - verdict.warning;
    return 0;
  }, [verdict]);

  if (verdict)
    return (
      <Wrapper show={show}>
        <div>
          <Text>Community Verdict: </Text>
          <VerdictResult result={result} />
        </div>
        <FlexWrapper>
          <Details
            name="Verify"
            verify={verdict.verify}
            warning={verdict.warning}
          />
          <Details
            name="Warning"
            verify={verdict.verify}
            warning={verdict.warning}
          />
        </FlexWrapper>
      </Wrapper>
    );
  return <div />;
});

const Wrapper = styled.div<{ show: boolean }>`
  height: 150px;
  padding: 19px 24px 34px;
  margin-top: ${({ show }) => (show ? '0' : '-100%')};
  transition: all 300ms ease-in-out;
`;

const Text = styled.span`
  color: ${styles.colors.verdictModalTextColor};
  font-size: 14px;
  line-height: 140%;
  font-weight: 300;
`;

const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 16px;
`;
