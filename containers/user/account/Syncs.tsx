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
  @media (min-width: 1525px) {
    display: flex;
    align-items: center;

    div + div {
      margin-left: 20px;
    }
  }

  @media (max-width: 1525px) {
    display: block;

    div + div {
      margin-top: 20px;
    }
  }
`;
