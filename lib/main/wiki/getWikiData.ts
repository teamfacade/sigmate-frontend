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
  const document: Wiki.DocumentType | undefined =
    title === 'empty' ? undefined : { ...ExDocument, title };

  return {
    document,
  };
}

export function getArticleEditData(title: string) {
  // @todo blocks 데이터 받아오기 --> blocks: fetch(.../title/...). 없는 글이면 빈 배열 반환.
  const blocks: BlockType[] = title === 'empty' ? [] : ExBlocks;

  return {
    title,
    blocks,
  };
}

// called when verdict modal is rendered
export function getVerifyData(
  documentID: number,
  isKeyInfo: boolean,
  blockID: number
) {
  return ExVerdict;
}
