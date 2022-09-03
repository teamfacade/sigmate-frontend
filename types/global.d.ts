import { ActionMeta, MultiValue, SingleValue } from 'react-select';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }

  interface UserProfileAttributes {
    id: number;
    displayName: string | null;
    bio: string | null;
    profileImage: Image | null;
    profileImageUrl: string | null;
  }

  namespace ReduxState {
    interface AuthStateType {
      signedIn: boolean;
      accessToken: string;
      refreshToken: string;
    }

    interface AccountStateType {
      id: number;
      userName: string | null;
      userNameUpdatedAt: Date | null;
      email: string;
      metamaskWallet: string | nul;
      isMetamaskWalletPublic: boolean;
      googleAccount: string | null;
      twitterHandle: string | null;
      isTwitterHandlePublic: boolean;
      discordAccount: null;
      isDiscordAccountPublic: boolean;
      isTester: boolean;
      isAdmin: boolean;
      locale: string | null;
      theme: string | null;
      emailEssential: boolean; // 이메일 수신동의
      emailMarketing: boolean;
      cookiesEssential: boolean; // 쿠키 방침 동의
      cookiesAnalytics: boolean;
      cookiesFunctional: boolean;
      cookiesTargeting: boolean;
      agreeTos: Date | null; // 동의한 날짜
      agreePrivacy: Date | null;
      agreeLegal: Date | null;
      referralCode: string;
      group: {
        // 유저 권한
        id: number;
        groupName: string;
        canCreateDocument: boolean;
        canRequestDocumentEdit: boolean;
        canEditDocument: boolean;
        canVerify: boolean;
        canReceivePoints: boolean;
        canParticipateEvent: boolean;
      };
      primaryProfile: {
        id: number;
        displayName: string | null;
        bio: string | null;
        profileImageUrl:
          | string
          | 'https://lh3.googleusercontent.com/c5dqxl-2uHZ82ah9p7yxrVF1ZssrJNSV_15Nu0TUZwzCWqmtoLxCUJgEzLGtxsrJ6-v6R6rKU_-FYm881TTiMCJ_=s1600';
        userId: number;
      };
    }

    interface RootStateType {
      auth: AuthStateType;
      account: AccountStateType;
    }
  }

  type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
  };

  type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
  };

  namespace MetamaskAuth {
    interface MetaMaskAuthResponse {
      metamaskWallet: string;
      nonce: number;
    }

    interface MetaMaskVerifyResponse {
      success: boolean;
      user?: any; // User information
      accessToken?: string;
      refreshToken?: string;
    }
  }

  type EditType = {
    name: string;
    editor: string;
    timestamp: number;
  };

  type RecentEditType = {
    timestamp: number;
    title: string;
  };

  interface StringKeyObj<T> {
    [index: string]: T;
  }

  type MintingType = {
    name: string;
    publisher: string;
    thumbnailURL: string;
    date: number;
    price: string;
    wikiPage?: string;
    mintPage?: string;
    twitterUrl?: string;
    telegramUrl?: string;
    discordUrl?: string;
  };

  type OptionType = {
    value: string;
    label: string;
  };

  type SingleSelectChangeEventHandler = (
    option: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => void;

  type MultiSelectChangeEventHandler = (
    option: MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => void;

  type BlockType = {
    id: number;
    tag: string;
    content: string;
    verdict?: VerdictType;
  };

  type DocumentCommentType = {
    id: number;
    username: string;
    comment: string;
  };

  type VerdictType =
    | {
        verify: number;
        warning: number;
        voted: string;
        comments: CommentType[];
      }
    | undefined;

  type CollectionKeyInfoType = {
    team: string;
    rugpool?: string;
    utility?: string;
    marketplace: string;
  };

  type DocumentVoteType = {
    voted: string;
    timestamp: string;
  };

  type ProfileType = {
    user?: {
      id: number;
      userName: string;
      metamaskWallet?: string;
      twitterHandle?: string;
      discordAccount?: string;
    };
    profile: UserProfileAttributes;
  };

  type ForumSearchFilter = 'Category' | 'Title' | 'Content';

  namespace Forum {
    type CategoryType = {
      name: string;
      description: string;
      imageURL: string;
    };

    type InfoType = {
      category: string;
      articleID: number;
      commentID?: number;
      replyID?: number;
    };

    type ReportType = {
      type: 'comment' | 'reply' | 'article';
      info: InfoType;
    };

    type NewArticleType = {
      title: string;
      content: string;
      tags: string[];
      imageUrls: string[];
    };

    type AuthorType = {
      id: number;
      userName?: string;
      primaryProfile: UserProfileAttributes;
    };

    type VoteType = {
      like?: boolean;
      voteCount: number;
    };

    type CommentType = {
      id: number;
      content: string;
      createdBy: Forum.AuthorType;
      votes: Forum.VoteType;
      replies: Forum.CommentType[];
    };

    type PostType = {
      id: number;
      title: string;
      content: string;
      createdBy: Forum.AuthorType;
      votes?: Forum.VoteType;
      comments?: Forum.CommentType[];
      tags?: string[];
      imageUrls?: string[];
      contentUpdatedAt?: string;
    };
  }

  namespace Admin {
    type UserType = {
      id: string;
      name: string;
      level: string;
      status: string;
      walletID: string;
      signupDate: string;
    };

    type ArticleDataType = {
      id: number;
      name: string;
      views: string;
      editedUsers: string;
      lastEdit: string;
    };

    type MintScheduleType = {
      id: number;
      name: string;
      tier: number;
      category: string;
      date: string;
    };

    type ForumArticleDataType = {
      id: number;
      title: string;
      category: string;
      author: string;
      tags: string[];
      date: string;
      comments: number;
    };
  }
}

export {};
