import Axios from 'lib/global/axiosInstance';
import { AxiosError } from 'axios';

const KeyInfoIndex: StringKeyObj<number> = {
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
};

const KeyInfoTitles: string[] = [
  'Name',
  'Thumbnail',
  'Team',
  'History',
  'Category',
  'Utility',
  'Whitelist Price',
  'Public Price',
  'Current FP',
  'Discord',
  'Twitter',
  'Official Website',
];

const KeyInfoBlockIds: string[] = [
  'name',
  'thumbnail',
  'team',
  'history',
  'category',
  'utility',
  'mintingPriceWl',
  'mintingPricePublic',
  'floorPrice',
  'discordUrl',
  'twitterHandle',
  'websiteUrl',
  'paymentTokens',
  'marketplace',
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
  myVerification: null,
  opinionCount: 0,
};

const SigmateDocument: Wiki.DocumentType = {
  id: -1,
  title: 'Sigmate',
  keyInfo: {
    name: {
      id: -1,
      textContent: 'Sigmate',
    },
    thumbnail: {
      id: KeyInfoIndex.Thumbnail,
      textContent: '/Icons/Favicon/sigmate-square-img.png',
    },
    team: {
      ...ExBlock,
      id: KeyInfoIndex.Team,
      textContent: 'Sigmate',
    },
    history: {
      ...ExBlock,
      id: KeyInfoIndex.History,
      textContent: 'Launched on mid october',
    },
    category: {
      ...ExBlock,
      id: KeyInfoIndex.Category,
      textContent: 'NFT information platform',
    },
    utility: {
      ...ExBlock,
      id: KeyInfoIndex.Utility,
      textContent: 'Write 2 Earn system',
    },
    mintingPriceWl: {
      ...ExBlock,
      id: KeyInfoIndex.WLPrice,
      textContent: '0.01',
    },
    mintingPricePublic: {
      ...ExBlock,
      id: KeyInfoIndex.PublicPrice,
      textContent: '0.01',
    },
    floorPrice: {
      ...ExBlock,
      id: KeyInfoIndex.CurrentPrice,
      textContent: '100',
    },
    discordUrl: {
      ...ExBlock,
      id: KeyInfoIndex.Discord,
      textContent: 'https://discord.gg/jzwrEkbmwZ',
    },
    twitterHandle: {
      ...ExBlock,
      id: KeyInfoIndex.Twitter,
      textContent: 'OfficialSigmate',
    },
    websiteUrl: {
      ...ExBlock,
      id: KeyInfoIndex.OfficialSite,
      textContent: 'https://www.sigmate.io',
    },
    paymentTokens: {
      ...ExBlock,
      id: KeyInfoIndex.Chain,
      textContent: 'SIGMA',
    },
    marketplace: {
      ...ExBlock,
      id: KeyInfoIndex.Marketplace,
      textContent: 'Sigmate',
    },
  },
  structure: [1, 2, 3, 4, 5],
  types: [{ id: 1, name: 'Platform', description: '', thumbnail: '' }],
  blocks: {
    1: {
      id: 1,
      element: 'h',
      textContent: 'About sigmate',
      verificationCounts: {
        verifyCount: 0,
        beAwareCount: 0,
      },
      myVerification: null,
      opinionCount: 0,
    },
    2: {
      id: 2,
      element: 'p',
      textContent:
        'NFT market has grown rapidly over the past three years with inconvenience. The biggest point is the lack of extensive NFT information service. Investors have to snoop around multiple sites and SNS communities such as Discord, Twitter, and Telegram to find scattered information.',
      verificationCounts: {
        verifyCount: 0,
        beAwareCount: 0,
      },
      myVerification: null,
      opinionCount: 0,
    },
    3: {
      id: 3,
      element: 'p',
      textContent:
        'NFT market is notorious for low reliability market, so most investors have to take care of verifying the information they get and always have to keep their eyes on fraud risk.',
      verificationCounts: {
        verifyCount: 0,
        beAwareCount: 0,
      },
      myVerification: null,
      opinionCount: 0,
    },
    4: {
      id: 4,
      element: 'h',
      textContent: "𝚺 That's why Sigmate is needed.",
      verificationCounts: {
        verifyCount: 0,
        beAwareCount: 0,
      },
      myVerification: null,
      opinionCount: 0,
    },
    5: {
      id: 5,
      element: 'p',
      textContent:
        'Sigmate is developed to overcome those pain-points and create the NFT market where anyone can participate with ease. Ultimately, Sigmate will lower the entry barriers for new inflow.',
      verificationCounts: {
        verifyCount: 0,
        beAwareCount: 0,
      },
      myVerification: null,
      opinionCount: 0,
    },
  },
  createdBy: {
    id: 1,
    userName: 'Admin',
    primaryProfile: {
      id: 1,
      displayName: 'Sigmate',
      bio: null,
      profileImage: null,
      profileImageUrl: null,
    },
  },
};

const InitialKeyInfos: Wiki.KeyInfoType = {
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
};

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
        },
        createdBy: data.createdBy || null,
      };
      return document;
    }
    return null;
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.log(
      `Error while fetching wiki document. ERR: ${
        (e as AxiosError).response?.status
      }`
    );
    return null;
  }
}

export async function getArticleReadNewData() {
  return {
    id: 1,
    title: 'Bellygom world official',
    data: {
      time: 1680179373836,
      blocks: [
        {
          id: '6kQVvjGKph',
          type: 'paragraph',
          data: {
            text: 'ha',
          },
        },
        {
          id: 'a_-puyOOWm',
          type: 'header',
          data: {
            text: 'hello',
            level: 2,
          },
        },
        {
          id: '0HFUBFA9mt',
          type: 'paragraph',
          data: {
            text: 'how are you?',
          },
        },
        {
          id: 'a1oaEgfbpn',
          type: 'paragraph',
          data: {
            text: 'aewflalala',
          },
        },
        {
          id: '2h7taN0hiA',
          type: 'table',
          data: {
            withHeadings: true,
            content: [
              ['huijilj', 'ghu', 'ji', 'jilj'],
              ['hi', 'jil', 'jij', 'l'],
            ],
          },
        },
        {
          id: 'PTXydqLDxY',
          type: 'list',
          data: {
            style: 'unordered',
            items: ['hi', 'jil', 'hello'],
          },
        },
        {
          id: '02VGc7Jkwo',
          type: 'list',
          data: {
            style: 'ordered',
            items: ['list', 'sfa', 'a', 'af'],
          },
        },
        {
          id: 'MWrH7VNca_',
          type: 'header',
          data: {
            text: 'headf',
            level: 2,
          },
        },
        {
          id: 'dhO4tNxASa',
          type: 'header',
          data: {
            text: 'ahjwielf',
            level: 4,
          },
        },
      ],
      version: '2.26.4',
    },
    keyInfo: {
      name: {
        id: 2,
        textContent: 'Bellygom World Official',
      },
      thumbnail: {
        id: 2,
        textContent:
          'https://i.seadn.io/gcs/files/ed4380136946111c0a73f0f18ede3700.gif?w=500&auto=format',
      },
      team: {
        id: 15,
        element: 'td',
        textContent: 'teat',
        opinionCount: 0,
        myVerification: null,
      },
      history: {
        id: 16,
        element: 'td',
        textContent: '',
        opinionCount: 0,
        myVerification: null,
      },
      category: {
        id: 17,
        element: 'td',
        style: null,
        textContent: '',
        opinionCount: 0,
        myVerification: null,
      },
      utility: {
        id: 18,
        element: 'td',
        textContent: '',
        opinionCount: 0,
        myVerification: null,
      },
      mintingPriceWl: {
        id: 19,
        element: 'td',
        textContent: '',
        opinionCount: 0,
        myVerification: null,
      },
      mintingPricePublic: {
        id: 20,
        element: 'td',
        textContent: '',
        opinionCount: 0,
        myVerification: null,
      },
      floorPrice: {
        id: 21,
        element: 'td',
        textContent: '0.1456825',
        opinionCount: 0,
        myVerification: null,
      },
      discordUrl: {
        id: 22,
        element: 'td',
        textContent: 'https://discord.gg/invite/TDYtz2fcSN',
        opinionCount: 0,
        myVerification: null,
      },
      twitterHandle: {
        id: 23,
        element: 'td',
        textContent: '',
        opinionCount: 0,
        myVerification: null,
      },
      websiteUrl: {
        id: 24,
        element: 'td',
        textContent: 'https://www.bellygom.world/',
        opinionCount: 0,
        myVerification: null,
      },
    },
    types: [],
    version: '2.26.4',
  };
}

export {
  KeyInfoIndex,
  KeyInfoTitles,
  KeyInfoBlockIds,
  InitialKeyInfos,
  SigmateDocument,
};
