import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { Etherium } from 'public/Icons/main/upcoming';

const SymbolIcons: StringKeyObj<typeof Etherium> = {
  ETH: Etherium,
};

type PropsType = {
  name: string;
  category: string;
  price?: string;
  symbol?: string;
  tier: number;
};

export default memo(function ScheduleInfos({
  name,
  category,
  price,
  symbol = 'ETH',
  tier,
}: PropsType) {
  const Symbol = SymbolIcons[symbol];

  return (
    <div>
      <Name>{name}</Name>
      <Collection>{category}</Collection>
      <PriceWrapper>
        <InfoText>Price: </InfoText>
        <Symbol />
        <InfoText>{price}</InfoText>
      </PriceWrapper>
      <InfoText>{`Tier: ${tier}`}</InfoText>
    </div>
  );
});

const Name = styled.p`
  margin: 13px 0 0 0;
  color: ${styles.colors.logoColor};
  font-size: 24px;
  font-weight: 900;
  line-height: 110%;
`;

const Collection = styled.p`
  margin: 2px 0 0 0;
  color: ${styles.colors.lighterTextColor};
  font-size: 16px;
  font-weight: 300;
  line-height: 140%;
`;

const InfoText = styled.p`
  margin: 2px 0 0 0;
  color: #4c596d;
  font-size: 16px;
  font-weight: 900;
  line-height: 140%;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    margin-left: 8px;
  }
`;
