import styled from 'styled-components';
import { MouseEventHandler } from 'react';
import styles from 'styles/styleLib';
import { MintingItem } from '.';

type PropsType = {
  mintings: Minting.ScheduleType[];
  onClickMintItem: MouseEventHandler<HTMLDivElement>;
};

export default function Mintings({ mintings, onClickMintItem }: PropsType) {
  if (mintings && mintings.length) {
    return (
      <Grid>
        {mintings.map((minting) => {
          // @todo minting되는 NFT 프로젝트의 이름이 겹칠 수 있는지 체크. 겹칠 수 있으면 unique key를 다른 것으로 변경
          return (
            <MintingItem
              key={minting.id}
              name={minting.name}
              category={minting.category || ''}
              thumbnailURL={
                minting.collection.bannerImageUrl ||
                minting.collection.imageUrl ||
                ''
              }
              onClick={onClickMintItem}
            />
          );
        })}
      </Grid>
    );
  }
  return (
    <Empty>
      <p>No mintings today</p>
    </Empty>
  );
}

const Grid = styled.div`
  position: relative;
  left: 6px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 183px auto;
  row-gap: 12px;
  height: 580px;
  overflow-y: auto;
`;

const Empty = styled.div`
  height: 580px;
  text-align: center;

  p {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
    color: ${styles.colors.lighterTextColor};
    font-size: 30px;
    font-weight: bold;
  }
`;
