export const KeyInfoIndex: StringKeyObj<number> = {
  Name: 0,
  Thumbnail: 1,
  Team: 2,
  Rugpool: 3,
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

const ExProfile: UserProfileAttributes = {
  id: 1,
  displayName: 'Berry',
  bio: null,
  profileImage: null,
  profileImageUrl: null,
};

const ExAuthor: Forum.AuthorType = {
  id: 1,
  userName: 'jmyoung',
  primaryProfile: ExProfile,
};

const ExVerification: Wiki.VerificationType = {
  id: 1,
  verify: 2400,
  warning: 351,
  isUpvote: null,
  timestamp: '0',
};

const ExVerdict: Wiki.BlockVerificationType = {
  id: 1,
  verification: ExVerification,
  comments: [
    {
      id: 1,
      username: 'jmyung0803',
      comment: 'This is not a fraud!',
    },
    {
      id: 2,
      username: 'limeAhn',
      comment: 'This is not a fraud!',
    },
    {
      id: 3,
      username: 'kwang jin',
      comment: 'This is a fraud!',
    },
  ],
};

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

const ExBlocks: Wiki.DocumentBlockType[] = [
  ExBlock,
  {
    ...ExBlock,
    id: 2,
  },
  {
    ...ExBlock,
    id: 3,
  },
  {
    ...ExBlock,
    id: 4,
  },
];

const ExKeyInfos: Wiki.DocumentBlockType[] = [
  {
    ...ExBlock,
    textContent: 'PEN',
    id: KeyInfoIndex.Name,
  },
  {
    ...ExBlock,
    id: KeyInfoIndex.Thumbnail,
    textContent: '',
  },
  {
    ...ExBlock,
    id: KeyInfoIndex.Team,
    textContent: 'Sigmate',
  },
  {
    ...ExBlock,
    id: KeyInfoIndex.Rugpool,
    textContent: '',
  },
  {
    ...ExBlock,
    id: KeyInfoIndex.Category,
    textContent: 'Game',
  },
  {
    ...ExBlock,
    id: KeyInfoIndex.Utility,
    textContent: 'Item',
  },
  {
    ...ExBlock,
    id: KeyInfoIndex.WLPrice,
    textContent: '0.25 ETH',
  },
  {
    ...ExBlock,
    id: KeyInfoIndex.PublicPrice,
    textContent: '0.5 ETH',
  },
  {
    ...ExBlock,
    id: KeyInfoIndex.CurrentPrice,
    textContent: '1.4 ETH',
  },
  {
    ...ExBlock,
    id: KeyInfoIndex.Discord,
    textContent: 'https://www.naver.com',
  },
  {
    ...ExBlock,
    id: KeyInfoIndex.Twitter,
    textContent: 'https://www.twitter.com/sigmateOfficial',
  },
  {
    ...ExBlock,
    id: KeyInfoIndex.OfficialSite,
    textContent: 'https://www.sigmate.io',
  },
  {
    ...ExBlock,
    id: KeyInfoIndex.Chain,
    textContent: 'ETH',
  },
  {
    ...ExBlock,
    id: KeyInfoIndex.Marketplace,
    textContent: 'opensea',
  },
];

const ExDocument: Wiki.DocumentType = {
  id: 1,
  title: '',
  blocks: ExBlocks,
  types: ['Game', 'PFP'],
  keyInfos: ExKeyInfos,
  createdBy: ExAuthor,
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
  rugpool: {
    ...ExBlock,
    id: KeyInfoIndex.Rugpool,
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
    textContent: '',
  },
};

export const InitialDocumentBlock: Wiki.DocumentBlockType = {
  id: Date.now(),
  element: '',
  textContent: '',
  verificationCounts: {
    verifyCount: 0,
    beAwareCount: 0,
  },
  opinionCount: 0,
};

export function getAllArticleTitles() {
  // @todo const titles = fetch....
  const titles = ['hush', 'empty'];

  return titles.map((title) => {
    return {
      params: {
        title,
      },
    };
  });
}

export function getArticleReadData(title: string) {
  // @todo blocks, 검증 데이터 받아오기 --> blocks: fetch(.../title/...). 없는 글이면 빈 배열 반환.
  const document: Wiki.DocumentType | null =
    title === 'empty' ? null : { ...ExDocument, title };

  return {
    document,
  };
}

export function getArticleEditData(title: string) {
  // @todo blocks 데이터 받아오기 --> blocks: fetch(.../title/...). 없는 글이면 빈 배열 반환.
  const document: Wiki.DocumentType = { ...ExDocument, title };

  return {
    document,
  };
}

// called when verdict modal is rendered
export function getVerifyData() {
  return ExVerdict;
}
