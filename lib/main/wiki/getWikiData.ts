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
  verifications: ExVerdict,
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
    id: 0,
  },
  {
    ...ExBlock,
    id: 1,
    textContent: '',
  },
  {
    ...ExBlock,
    id: 2,
    textContent: 'Sigmate',
  },
  {
    ...ExBlock,
    id: 3,
    textContent: '',
  },
  {
    ...ExBlock,
    id: 4,
    textContent: 'Game',
  },
  {
    ...ExBlock,
    id: 5,
    textContent: '0.25 ETH',
  },
  {
    ...ExBlock,
    id: 6,
    textContent: '0.5 ETH',
  },
  {
    ...ExBlock,
    id: 7,
    textContent: '1.4 ETH',
  },
  {
    ...ExBlock,
    id: 8,
    textContent: 'https://www.naver.com',
  },
  {
    ...ExBlock,
    id: 9,
    textContent: 'https://www.twitter.com/sigmateOfficial',
  },
  {
    ...ExBlock,
    id: 10,
    textContent: 'https://www.sigmate.io',
  },
  {
    ...ExBlock,
    id: 11,
    textContent: 'ETH',
  },
  {
    ...ExBlock,
    id: 12,
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

export const KeyInfoIndex: StringKeyObj<number> = {
  name: 0,
  thumbnailUrl: 1,
  team: 2,
  rugpool: 3,
  utility: 4,
  whitelistPrice: 5,
  publicPrice: 6,
  currentPrice: 7,
  discordUrl: 8,
  twitterUrl: 9,
  officialSiteUrl: 10,
  chain: 11,
  marketplace: 12,
};

export const gridAreas = [
  'Name',
  'Thumbnail',
  'Td_Team',
  'Td_Rugpool',
  'Td_Utility',
  'Td_WLPrice',
  'Td_PublicPrice',
  'Td_CurrentPrice',
  'Td_Discord',
  'Td_Twitter',
  'Td_OfficialSite',
  'Td_Chain',
  'Td_MarketPlace',
];

export const InitialKeyInfos: Wiki.DocumentBlockType[] = [
  {
    ...ExBlock,
    textContent: 'sigmate',
    id: 0,
  },
  {
    ...ExBlock,
    id: 1,
    textContent: '',
  },
  {
    ...ExBlock,
    id: 2,
    textContent: '',
  },
  {
    ...ExBlock,
    id: 3,
    textContent: '',
  },
  {
    ...ExBlock,
    id: 4,
    textContent: '',
  },
  {
    ...ExBlock,
    id: 5,
    textContent: '0.25 ETH',
  },
  {
    ...ExBlock,
    id: 6,
    textContent: '0.5 ETH',
  },
  {
    ...ExBlock,
    id: 7,
    textContent: '1.4 ETH',
  },
  {
    ...ExBlock,
    id: 8,
    textContent: 'https://www.naver.com',
  },
  {
    ...ExBlock,
    id: 9,
    textContent: 'https://www.twitter.com/sigmateOfficial',
  },
  {
    ...ExBlock,
    id: 10,
    textContent: 'https://www.sigmate.io',
  },
  {
    ...ExBlock,
    id: 11,
    textContent: 'ETH',
  },
  {
    ...ExBlock,
    id: 12,
    textContent: '',
  },
];

const InitialVerification: Wiki.VerificationType = {
  id: Date.now(),
  isUpvote: null,
  verify: 0,
  warning: 0,
  timestamp: new Date(Date.now()).toISOString(),
};
const InitialBlockVerification: Wiki.BlockVerificationType = {
  id: Date.now(),
  verification: InitialVerification,
  comments: [],
};
export const InitialDocumentBlock: Wiki.DocumentBlockType = {
  id: Date.now(),
  element: '',
  textContent: '',
  verifications: InitialBlockVerification,
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
