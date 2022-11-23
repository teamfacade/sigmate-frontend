import { memo, useMemo } from 'react';
import styled from 'styled-components';
import { Details, VerdictResult } from 'components/main/wiki/read/verdictModal';
import styles from 'styles/styleLib';

type PropsType = {
  show: boolean;
  votes: Wiki.VerificationType;
};

export default memo(function ComVerdictData({ show, votes }: PropsType) {
  const { verifyCount, beAwareCount } = votes.verificationCounts;

  const result = useMemo(() => {
    if (votes) return verifyCount - beAwareCount;
    return 0;
  }, [votes]);

  if (votes)
    return (
      <Wrapper show={show}>
        <div>
          <Text>Community Verdict: </Text>
          <VerdictResult result={result} />
        </div>
        <FlexWrapper>
          <Details name="Verify" verify={verifyCount} warning={beAwareCount} />
          <Details name="Warning" verify={verifyCount} warning={beAwareCount} />
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
