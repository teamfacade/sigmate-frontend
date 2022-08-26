import { useMemo, memo } from 'react';
import styled from 'styled-components';
import convertDate from 'hooks/convertDate';
import { ApproveResult } from 'components/user/edits';
import styles from 'styles/styleLib';

type PropsType = {
  name: string;
  revisionID: string;
  editLength: string;
  editDetailUrl: string;
  timestamp: string;
  approved: boolean;
};

// @todo username에서 프로필 페이지로의 링크 필요
export default memo(function LogItem({
  name,
  revisionID,
  editLength,
  editDetailUrl,
  timestamp,
  approved,
}: PropsType) {
  const time = useMemo(
    () => convertDate(new Date(timestamp), 'time', undefined),
    [timestamp]
  );

  return (
    <tbody>
      <tr>
        <td>{name}</td>
        <td>{revisionID}</td>
        <ColorfulTd positive={parseInt(editLength, 10) > 0}>{`${
          parseInt(editLength, 10) < 0 ? '' : '+'
        }${editLength}`}</ColorfulTd>
        <LinkTd>{editDetailUrl || 'coming soon!'}</LinkTd>
        <td>{time}</td>
        <td>
          <Approval approved={approved}>
            <ApproveResult approved={approved}>
              {`${approved ? 'O' : 'X'}`}
            </ApproveResult>
          </Approval>
        </td>
      </tr>
    </tbody>
  );
});

const LinkTd = styled.td`
  color: ${styles.colors.emphColor};

  a {
    color: ${styles.colors.emphColor};
  }
`;

const ColorfulTd = memo(styled.td<{ positive: boolean }>`
  color: ${({ positive }) =>
    positive
      ? styles.colors.positiveTextColor
      : styles.colors.negativeTextColor} !important;
`);

const Approval = memo(styled.div<{ approved: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`);
