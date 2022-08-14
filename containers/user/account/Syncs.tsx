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

  @media (max-width: 1350px) {
    display: block;
    width: 100%;

    div + div {
      margin-top: 20px;
    }
  }
`;
