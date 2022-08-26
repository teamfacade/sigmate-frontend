import { Dispatch, memo, SetStateAction } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import styles from 'styles/styleLib';
import UserImageEx from 'public/Icons/user/account/UserImageEx.png';

type PropsType = {
  edit?: boolean;
  setShowModal?: Dispatch<SetStateAction<number>>;
  name: string;
  thumbnailUrl: string;
  team: string;
  rugpool: string;
  type: string;
  utility: string;
  WLPrice: string;
  publicPrice: string;
  currentPrice: string;
  discordUrl: string;
  twitterUrl: string;
  officialSiteUrl: string;
  chain: string;
  marketplace: string;
};

export default memo(function EditKeyInfo({
  name,
  thumbnailUrl,
  WLPrice,
  publicPrice,
  currentPrice,
  discordUrl,
  twitterUrl,
  officialSiteUrl,
  chain,
}: PropsType) {
  return (
    <>
      <H3>Key Info</H3>
      <Hr />
      <Table>
        <TableItem gridArea="Name">
          <p>{name}</p>
        </TableItem>
        <TableItem gridArea="Thumbnail">
          <ImageWrapper width="100%" height="100%">
            <Image
              src={thumbnailUrl || UserImageEx}
              alt="thumbnail image"
              layout="fill"
            />
          </ImageWrapper>
        </TableItem>
        <TableItem gridArea="Th_Team">
          <p>Team</p>
        </TableItem>
        <TableItem gridArea="Tr_Team">
          <p>Team</p>
        </TableItem>
        <TableItem gridArea="Td_Team">
          <textarea name="team" rows={1} placeholder="Type team name" />
        </TableItem>
        <TableItem gridArea="Tr_Rugpool">
          <p>Rugpool</p>
        </TableItem>
        <TableItem gridArea="Td_Rugpool">
          <textarea name="rugpool" rows={1} placeholder="Any rugpools?" />
        </TableItem>
        <TableItem gridArea="Th_Category">
          <p>Category</p>
        </TableItem>
        <TableItem gridArea="Tr_Utility">
          <p>Utility</p>
        </TableItem>
        <TableItem gridArea="Td_Utility">
          <textarea
            name="utility"
            rows={1}
            placeholder="What utilities does it have?"
          />
        </TableItem>
        <TableItem gridArea="Th_Price">
          <p>Minting Price</p>
        </TableItem>
        <TableItem gridArea="Tr_WLPrice">
          <p>Whitelist</p>
        </TableItem>
        <TableItem gridArea="Td_WLPrice">
          <p>{WLPrice}</p>
        </TableItem>
        <TableItem gridArea="Tr_PublicPrice">
          <p>Public</p>
        </TableItem>
        <TableItem gridArea="Td_PublicPrice">
          <p>{publicPrice}</p>
        </TableItem>
        <TableItem gridArea="Tr_CurrentPrice">
          <p>Current</p>
        </TableItem>
        <TableItem gridArea="Td_CurrentPrice">
          <p>{currentPrice}</p>
        </TableItem>
        <TableItem gridArea="Th_Community">
          <p>Community</p>
        </TableItem>
        <TableItem gridArea="Tr_Discord">
          <p>Discord</p>
        </TableItem>
        <TableItem gridArea="Td_Discord">
          <p>{discordUrl}</p>
        </TableItem>
        <TableItem gridArea="Tr_Twitter">
          <p>Twitter</p>
        </TableItem>
        <TableItem gridArea="Td_Twitter">
          <p>{twitterUrl}</p>
        </TableItem>
        <TableItem gridArea="Tr_OfficialSite">
          <p>Official website</p>
        </TableItem>
        <TableItem gridArea="Td_OfficialSite">
          <p>{officialSiteUrl}</p>
        </TableItem>
        <TableItem gridArea="Th_Chain">
          <p>Chain</p>
        </TableItem>
        <TableItem gridArea="Tr_Chain" />
        <TableItem gridArea="Td_Chain">
          <p>{chain}</p>
        </TableItem>
        <TableItem gridArea="Th_Marketplace">
          <p>Marketplace</p>
        </TableItem>
        <TableItem gridArea="Tr_Marketplace" />
        <TableItem gridArea="Td_MarketPlace">
          <textarea name="marketplace" rows={1} placeholder="Ex) opensea ..." />
        </TableItem>
      </Table>
    </>
  );
});

const H3 = memo(styled.h3`
  margin: 0 0 10px 0;
  color: ${styles.colors.headerColor};
  font-size: 20px;
  font-weight: bold;
  line-height: 110%;
`);

const Hr = memo(styled.hr`
  height: 1px;
  margin: 0 0 20px 0;
  color: ${styles.colors.hrColor};
`);

const Table = styled.div`
  display: grid;
  grid-template-areas:
    'Name           Name            Name'
    'Thumbnail      Thumbnail       Thumbnail'
    'Th_Team        Tr_Team         Td_Team'
    'Th_Team        Tr_Rugpool      Td_Rugpool'
    'Th_Category    Tr_Utility      Td_Utility'
    'Th_Price       Tr_WLPrice      Td_WLPrice'
    'Th_Price       Tr_PublicPrice  Td_PublicPrice'
    'Th_Price       Tr_CurrentPrice Td_CurrentPrice'
    'Th_Community   Tr_Discord      Td_Discord'
    'Th_Community   Tr_Twitter      Td_Twitter'
    'Th_Community   Tr_OfficialSite Td_OfficialSite'
    'Th_Chain       Tr_Chain        Td_Chain'
    'Th_Marketplace Tr_Marketplace  Td_MarketPlace';
  grid-template-rows: 40px 215px repeat(11, 30px);
  grid-template-columns: 115px 190px 195px;
  width: fit-content;
  border: 1px solid ${styles.colors.hrColor};
  border-bottom: none;
`;

const TableItem = styled.div<{ gridArea: string }>`
  grid-area: ${({ gridArea }) => gridArea};

  display: flex;
  align-items: center;
  justify-content: ${({ gridArea }) => {
    if (gridArea === 'Name' || gridArea.startsWith('Th_')) return `center;`;
    return `flex-start;`;
  }};

  width: 100%;
  height: 100%;
  background-color: ${({ gridArea }) => {
    if (gridArea === 'Name' || gridArea.startsWith('Th_'))
      return styles.colors.globalBackgroundColor;
    if (gridArea.startsWith('Tr_')) return styles.colors.tableRowColor;
    return '#FFFFFF';
  }};

  border-bottom: ${({ gridArea }) => {
    if (
      gridArea === 'Thumbnail' ||
      gridArea.startsWith('Th_') ||
      gridArea.startsWith('Tr_') ||
      gridArea.startsWith('Td_')
    )
      return `1px solid ${styles.colors.hrColor};`;
    return '';
  }};

  overflow: scroll auto;

  p {
    margin: 0;
    color: ${styles.colors.logColor};
    font-family: 'Inter', sans-serif;
    line-height: 160%;

    ${({ gridArea }) => {
      if (gridArea === 'Name')
        return `font-size: 17px; font-weight: 700; text-align: center;`;
      if (gridArea.startsWith('Th_'))
        return `font-size: 14px; font-weight: 500; text-align: center;`;
      return `padding-left: 14px; font-size: 13px; font-weight: 300; text-align: start`;
    }};
  }

  textarea {
    width: 100%;
    margin: 0;
    padding-left: 14px;
    color: ${styles.colors.logColor};
    font-size: 13px;
    font-weight: 300;
    font-family: 'Inter', sans-serif;
    line-height: 160%;
    text-align: start;
    border: none;
    resize: none;

    :focus-visible {
      outline: none;
    }

    ::placeholder {
      color: #c4c4c4;
    }
  }
`;