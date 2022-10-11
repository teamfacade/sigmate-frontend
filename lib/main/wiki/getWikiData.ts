import Axios from 'lib/global/axiosInstance';
import { AxiosError } from 'axios';

export const KeyInfoIndex: StringKeyObj<number> = {
  Name: 0,
  Thumbnail: 1,
  Team: 2,
  History: 3,
  Category: 4,
  Utility: 5,
  WLPrice: 6,
  PublicPrice: 7,
  CurrentPrice: 8,
  Discord: 9,
  Twitter: 10,
  OfficialSite: 11,
  Chain: 12,
  Marketplace: 13,
};

export const KeyInfoTitles: string[] = [
  'Name',
  'Thumbnail',
  'Team',
  'History',
  'Category',
  'Utility',
  'Whitelist',
  'Public',
  'Current',
  'Discord',
  'Twitter',
  'Official website',
  'Chain',
  'Marketplace',
];

const ExBlock: Wiki.DocumentBlockType = {
  id: 0,
  element: 'p',
  textContent:
    'the cites of the word in classical literature, discovere\n' +
    'of "de Finibus Bonorum et Malorum" (The Extremes of G\n' +
    'ethics, very popular during the Renaissance. The first \n' +
    'line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
  verificationCounts: {
    verifyCount: 0,
    beAwareCount: 0,
  },
  opinionCount: 0,
};

export const InitialKeyInfos: Wiki.KeyInfoType = {
  name: {
    textContent: '',
    id: KeyInfoIndex.Name,
  },
  thumbnail: {
    id: KeyInfoIndex.Thumbnail,
    textContent: '',
  },
  team: {
    ...ExBlock,
    id: KeyInfoIndex.Team,
    textContent: '',
  },
  history: {
    ...ExBlock,
    id: KeyInfoIndex.History,
    textContent: '',
  },
  category: {
    ...ExBlock,
    id: KeyInfoIndex.Category,
    textContent: '',
  },
  utility: {
    ...ExBlock,
    id: KeyInfoIndex.Utility,
    textContent: '',
  },
  mintingPriceWl: {
    ...ExBlock,
    id: KeyInfoIndex.WLPrice,
    textContent: '0.25 ETH',
  },
  mintingPricePublic: {
    ...ExBlock,
    id: KeyInfoIndex.PublicPrice,
    textContent: '0.5 ETH',
  },
  floorPrice: {
    ...ExBlock,
    id: KeyInfoIndex.CurrentPrice,
    textContent: '1.4 ETH',
  },
  discordUrl: {
    ...ExBlock,
    id: KeyInfoIndex.Discord,
    textContent: 'https://www.naver.com',
  },
  twitterHandle: {
    ...ExBlock,
    id: KeyInfoIndex.Twitter,
    textContent: 'https://www.twitter.com/sigmateOfficial',
  },
  websiteUrl: {
    ...ExBlock,
    id: KeyInfoIndex.OfficialSite,
    textContent: 'https://www.sigmate.io',
  },
  paymentTokens: {
    ...ExBlock,
    id: KeyInfoIndex.Chain,
    textContent: 'ETH',
  },
  marketplace: {
    ...ExBlock,
    id: KeyInfoIndex.Marketplace,
    textContent: 'opensea',
  },
};

export const gridAreas = [
  'Name',
  'Thumbnail',
  'Td_Team',
  'Td_Rugpool',
  'Td_Category',
  'Td_Utility',
  'Td_WLPrice',
  'Td_PublicPrice',
  'Td_CurrentPrice',
  'Td_Discord',
  'Td_Twitter',
  'Td_OfficialSite',
  'Td_Chain',
  'Td_Marketplace',
];

export function getAllArticleTitles() {
  // @todo const titles = fetch....
  const titles = ['hush', 'empty'];

  return titles.map((title) => {
    return {
      params: {
        id: title,
      },
    };
  });
}

export async function getArticleReadData(id: string) {
  try {
    const res = await Axios.get(`/wiki/d/${id}`);
    if (res.status === 200) {
      const { data } = res.data;
      const {
        team,
        history,
        category,
        utility,
        mintingPriceWl,
        mintingPricePublic,
        floorPrice,
        discordUrl,
        twitterHandle,
        websiteUrl,
        paymentTokens,
        marketplace,
      } = data.collection.blocks;
      const document: Wiki.DocumentType = {
        id: Number.parseInt(id, 10),
        title: data.title,
        structure: data.structure,
        blocks: data.blocks,
        types: data.categories,
        keyInfo: {
          name: {
            id: data.collection.id,
            textContent: data.collection.name,
          },
          thumbnail: {
            id: data.collection.id,
            textContent: data.collection.imageUrl,
          },
          team,
          history,
          category,
          utility,
          mintingPriceWl,
          mintingPricePublic,
          floorPrice,
          discordUrl,
          twitterHandle,
          websiteUrl,
          paymentTokens,
          marketplace,
        },
        createdBy: data.createdBy,
      };
      return document;
    }
    return null;
  } catch (e: any) {
    console.log(
      `Error while fetching wiki document. ERR: ${(e as AxiosError).status}`
    );
    return null;
  }
}
