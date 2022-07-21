import { memo } from 'react';
import styled from 'styled-components';
import { ClientLink } from 'hooks/useSPARouting';
import {
  Account,
  Calender,
  Edits,
  Points,
  Referrals,
  Staking,
} from 'public/Icons/user/Layout';

type SVGIcon = ReturnType<typeof Account>;

/*
 *   use string as a key of object in typescript:
 *   https://soopdop.github.io/2020/12/01/index-signatures-in-typescript/
 */
type IconType = {
  [index: string]: SVGIcon;
  Account: SVGIcon;
  Calender: SVGIcon;
  Edits: SVGIcon;
  Points: SVGIcon;
  Tokens: SVGIcon;
  Referrals: SVGIcon;
  Staking: SVGIcon;
};

const Icons: IconType = {
  Account,
  Calender,
  Edits,
  Points,
  Tokens: Points,
  Referrals,
  Staking,
};

type PropsType = {
  IconName: string;
  Content: string;
  Active: boolean;
};

export default memo(function SideItem({
  IconName,
  Content,
  Active,
}: PropsType) {
  const Icon = Icons[IconName];

  return (
    <ClientLink
      to={`/user${IconName === 'Account' ? '' : `/${IconName.toLowerCase()}`}`}
    >
      <Wrapper name={IconName} Active={Active}>
        <Icon fill={Active ? '#2563EB' : '#DADEE5'} />
        <p>{Content}</p>
      </Wrapper>
    </ClientLink>
  );
});

const Wrapper = styled.button<{ Active: boolean }>`
  display: flex;
  align-items: center;
  max-width: 256px;
  padding: 15px 75px 15px 0;
  border: none;
  background-color: transparent;

  svg {
    width: 24px;
    margin-right: 24px;
    color: ${({ Active }) => (Active ? '#2563EB' : '#DADEE5')};
  }

  p {
    margin: 0;
    color: ${({ Active }) => (Active ? '#2563EB' : '#606C80')};
    font-size: 15px;
    font-weight: bold;
  }
`;
