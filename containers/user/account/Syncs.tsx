import styled from 'styled-components';
import { SyncWallet, SyncSocial } from 'components/user/account';

export default function UserPage() {
  return (
    <SyncWrapper>
      <SyncWallet />
      <SyncSocial />
    </SyncWrapper>
  );
}

const SyncWrapper = styled.div`
  display: flex;
  align-items: center;

  div + div {
    margin-left: 20px;
  }
`;
