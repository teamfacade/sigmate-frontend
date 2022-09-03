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

const ExVote: Forum.VoteType = {
  voteCount: 322,
};

const ExForumPost: Forum.PostType = {
  id: 1,
  votes: ExVote,
  createdBy: {
    id: 1,
    userName: 'WKSEO',
    primaryProfile: ExProfile,
  },
  tags: ['NFT', 'Bellybear'],
  contentUpdatedAt: new Date(Date.now()).toISOString(),
  title:
    'An ‘NFT’ digital image just sold for US$69 million \n' +
    '— but what is it?',
  content:
    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000\n\n Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000 Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literatur',
  imageUrls: [],
  comments: [],
};

export function getCategoriesData() {
  /*
          Returns an array that has all needed data to render forum categories,
          which looks like this:

          {
              name: string,
               description: string,
                imageURL: string,
          }
      */

  // @todo fetch Data from server
  const CategoriesEx: Forum.CategoryType[] = [
    { name: 'Best', description: 'For PFP Users', imageURL: '' },
    { name: 'Game', description: 'For PFP Users', imageURL: '' },
    { name: 'PFP', description: 'For PFP Users', imageURL: '' },
    { name: 'Best', description: 'For PFP Users', imageURL: '' },
    { name: 'Best', description: 'For PFP Users', imageURL: '' },
    { name: 'Best', description: 'For PFP Users', imageURL: '' },
    { name: 'Best', description: 'For PFP Users', imageURL: '' },
    { name: 'Best', description: 'For PFP Users', imageURL: '' },
    { name: 'Best', description: 'For PFP Users', imageURL: '' },
    { name: 'Best', description: 'For PFP Users', imageURL: '' },
  ];

  return CategoriesEx;
}
export function getAllCategories() {
  const categories = [
    'Game',
    'Metaverse',
    'Collectibles',
    'Sports',
    'Utility',
    'Art',
    'Photography',
    'Defi',
    'Music',
    'Domain names',
    'DAO',
    'Meme',
  ];

  return categories.map((category) => {
    return {
      params: {
        category,
      },
    };
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getCategoryArticles(category: string) {
  // @todo Axios -> res.data

  const ExForumPosts: Forum.PostType[] = [
    ExForumPost,
    { ...ExForumPost, id: 2 },
    { ...ExForumPost, id: 3 },
    { ...ExForumPost, id: 4 },
  ];

  return ExForumPosts;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getForumArticleData(category: string, ArticleID: string) {
  const ExComment: Forum.CommentType = {
    id: 1,
    createdBy: ExAuthor,
    content: 'Contrary to popular belief, Lorem Ipsu Contrary to',
    votes: ExVote,
    replies: [
      {
        id: 1,
        createdBy: ExAuthor,
        content: 'Contrary to popular belief, Lorem Ipsu Contrary to',
        votes: ExVote,
        replies: [],
      },
      {
        id: 2,
        createdBy: ExAuthor,
        content: 'Contrary to popular belief, Lorem Ipsu Contrary to',
        votes: ExVote,
        replies: [],
      },
      {
        id: 3,
        createdBy: ExAuthor,
        content: 'Contrary to popular belief, Lorem Ipsu Contrary to',
        votes: ExVote,
        replies: [],
      },
      {
        id: 4,
        createdBy: ExAuthor,
        content: 'Contrary to popular belief, Lorem Ipsu Contrary to',
        votes: ExVote,
        replies: [],
      },
      {
        id: 5,
        createdBy: ExAuthor,
        content: 'Contrary to popular belief, Lorem Ipsu Contrary to',
        votes: ExVote,
        replies: [],
      },
    ],
  };
  const Excomments: Forum.CommentType[] = [
    ExComment,
    { ...ExComment, id: 2 },
    { ...ExComment, id: 3 },
    { ...ExComment, id: 4 },
    { ...ExComment, id: 5 },
  ];
  const ForumPost: Forum.PostType = {
    ...ExForumPost,
    comments: Excomments,
  };

  // @todo Axios -> res.data

  return ForumPost;
}

export function getPrevArticleContent(
  category: string,
  articleID: string | undefined
): Forum.NewArticleType {
  const ExForumNewArticle = {
    tags: ['NFT', 'Bellybear'],
    title:
      'An ‘NFT’ digital image just sold for US$69 million \n' +
      '— but what is it?',
    content:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000\n\n Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000 Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literatur',
    imageUrls: [],
  };

  if (articleID === undefined) {
    return {
      title: '',
      content: '',
      tags: [],
      imageUrls: [],
    };
  }
  // @todo fetch forum article content
  return {
    title: ExForumNewArticle.title,
    content: ExForumNewArticle.content,
    tags: ExForumNewArticle.tags,
    imageUrls: ExForumNewArticle.imageUrls,
  };
}

export function getAuthorName(createdBy: Forum.AuthorType): string {
  return createdBy.primaryProfile.displayName || createdBy.userName || '';
}
