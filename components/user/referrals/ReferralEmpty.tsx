import styled from 'styled-components';
import { Empty } from 'public/Icons/user/referral';

export default function ReferralEmpty() {
  return (
    <Wrapper>
      <Empty />
      <NoOneThere>No one has entered yours so far</NoOneThere>
      <SubMsg>Copy your referral and share it with your friends!</SubMsg>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const NoOneThere = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #404349;
`;

const SubMsg = styled.p`
  margin: 4px 0;
  font-size: 14px;
  line-height: 20px;
  color: #6d7175;
`;
