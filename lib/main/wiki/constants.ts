const MARKETPLACES = <const>['opensea', 'unregistered'];

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

const KeyInfoBlockIds = <const>[
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
];

const EditableKeyInfos = <const>[
  'team',
  'history',
  'category',
  'utility',
  'mintingPriceWl',
  'mintingPricePublic',
  'discordUrl',
  'twitterHandle',
  'websiteUrl',
];

export {
  MARKETPLACES,
  KeyInfoIndex,
  KeyInfoTitles,
  KeyInfoBlockIds,
  EditableKeyInfos,
};
