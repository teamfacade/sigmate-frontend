import Axios from 'lib/global/axiosInstance';

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
const ExComments: Forum.CommentType[] = [
  ExComment,
  { ...ExComment, id: 2 },
  { ...ExComment, id: 3 },
  { ...ExComment, id: 4 },
  { ...ExComment, id: 5 },
];

export async function getCategoriesData() {
  // @todo fetch Data from server
  try {
    const res = await Axios.get('/forum/c', { params: { limit: 10, page: 1 } });
    return res.data.categories;
  } catch {
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getForumArticleData(ArticleID: string) {
  try {
    const { forumPost } = await Axios.get(`/forum/p/${ArticleID}`).then(
      (res) => res.data
    );

    return {
      id: forumPost.id,
      title: forumPost.title,
      content: forumPost.content,
      tags: forumPost.tags.map((tag: any) => tag.name),
      createdAt: forumPost.createdAt,
      createdBy: forumPost.createdBy,
      votes: { voteCount: forumPost.voteCount },
      comments: ExComments,
    };
  } catch {
    return null;
  }
}

export async function getPrevArticleContent(
  articleID: string | undefined
): Promise<Forum.NewArticleType> {
  if (articleID === undefined) {
    return {
      title: '',
      content: '',
      tags: [],
      imageUrls: [],
    };
  }
  // @todo tag any type 제거
  try {
    const { forumPost } = await Axios.get(`/forum/p/${articleID}`).then(
      (res) => res.data
    );
    return {
      title: forumPost.title,
      content: forumPost.content,
      tags: forumPost.tags.map((tag: any) => tag.name),
      imageUrls: [],
      articleID: Number.parseInt(articleID, 10),
    };
  } catch {
    return {
      title: '',
      content: '',
      tags: [],
      imageUrls: [],
      error: true,
      articleID: Number.parseInt(articleID, 10),
    };
  }
}

export function getAuthorName(createdBy: Forum.AuthorType): string {
  return createdBy.primaryProfile.displayName || createdBy.userName || '';
}
