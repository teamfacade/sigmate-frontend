import styled from 'styled-components';
/* @todo 지원하는 화폐 아이콘 import */
import { Etherium } from 'public/Icons/user/points';

type SVGIcon = ReturnType<typeof Etherium>;

export type AmountType = {
  crypto: 'Etherium' | 'Change';
  ticker: 'ETH' | 'CNG';
  quantity: string;
};

type IconType = {
  [index: string]: SVGIcon;
  Etherium: SVGIcon;
};

const Icons: IconType = {
  Etherium,
};

export default function Amount({ crypto, quantity, ticker }: AmountType) {
  const Icon = Icons[crypto];

  return (
    <AmountWrapper>
      <Icon />
      <p>{`${quantity} ${ticker}`}</p>
    </AmountWrapper>
  );
}

const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
`;
