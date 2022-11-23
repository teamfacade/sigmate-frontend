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

  type PrimaryProfileType = {
    id: number;
    displayName: string;
    bio: string | null;
    profileImageUrl: string;
  };

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
      agreeTos: string | null; // 동의한 날짜
      agreePrivacy: string | null;
      agreeLegal: string | null;
      referralCode: string;
      referredBy: string;
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

  type PagedSWRDataType<T> = {
    total: number;
    data: T;
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

  namespace ReactSelect {
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
  }

  type CollectionCategoryType = {
    id: number;
    name: string;
  };

  type RecentEditType = {
    timestamp: number;
    title: string;
  };

  interface StringKeyObj<T> {
    [index: string]: T;
  }

  namespace Minting {
    type CollectionType = {
      id?: number;
      name?: string;
      category?: CollectionCategoryType;
      twitterHandle?: string;
      discordUrl?: string;
      websiteUrl?: string;
      telegramUrl?: string;
      imageUrl?: string;
      bannerImageUrl?: string;
      document?: any;
    };

    type ScheduleType = {
      id: number;
      name: string;
      category?: string;
      tier: number;
      mintingTime: Date;
      mintingUrl?: string;
      description?: string;
      collection: CollectionType;
      mintingPrice?: string;
      mintingPriceSymbol?: string; // ETH/KLAYTN/SOL/Matic
    };

    type SchedulesType = StringKeyObj<Minting.ScheduleType[]>;
  }

  namespace Wiki {
    type EditLogType = {
      id: number;
      document: {
        id: number;
        title: string;
      };
      createdBy: {
        id: number;
        userName: string;
        primaryProfile: PrimaryProfileType;
      };
      approvedAt: string;
    };

    type SearchResultType = {
      id: number;
      title: string;
      collection: {
        id: number;
        slug: string;
        name: string;
      };
      textContent: string;
    };

    type HappenedType = {
      opt: 't' | 'd';
      content: string;
      timestamp: string;
      contentId: string;
    };

    type KeyInfoType = {
      [index: string];
      name: {
        id: number;
        textContent: string;
      };
      thumbnail: {
        id: number;
        textContent: string;
      };
      team: DocumentBlockType;
      history: DocumentBlockType;
      category: DocumentBlockType;
      utility: DocumentBlockType;
      mintingPriceWl: DocumentBlockType;
      mintingPricePublic: DocumentBlockType;
      floorPrice: DocumentBlockType;
      discordUrl: DocumentBlockType;
      twitterHandle: DocumentBlockType;
      websiteUrl: DocumentBlockType;
    };

    type ModalDataType = {
      blockID: string;
    };

    type VerificationCountType = {
      verifyCount: number;
      beAwareCount: number;
    };

    type VerificationType = {
      verificationCounts: VerificationCountType;
      myVerification: boolean | null;
    };

    type OpinionType = {
      id: number;
      content: string;
      createdBy: Forum.AuthorType;
    };

    type DocumentCommentType = {
      id: number;
      username: string;
      comment: string;
    };

    type DocumentBlockType = {
      id: number;
      opinions?: OpinionType[];
      document?: {
        id: number;
        title: string;
      };
      element: string;
      textContent: string;
      verificationCounts: VerificationCountType;
      opinionCount: number;
      myVerification?: MyVerificationType;
    };

    type DocumentType = {
      id: number;
      title: string;
      structure: number[];
      blocks?: StringKeyObj<Wiki.DocumentBlockType>;
      keyInfo?: Wiki.KeyInfoType;
      types: Forum.CategoryType[];
      createdBy: Forum.AuthorType;
    };
  }

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
      id: number;
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
      articleID?: number;
      error?: boolean;
    };

    type AuthorType = {
      id: number;
      userName?: string;
      primaryProfile: UserProfileAttributes;
    };

    type VoteType = {
      voteCount: number;
    };

    type CommentType = {
      id: number;
      content: string;
      createdBy: Forum.AuthorType;
      voteCount: number;
      replies: Forum.CommentType[] | null;
    };

    // @todo categories, tags type any 해제
    type PostType = {
      id: number;
      title: string;
      content: string;
      createdBy?: Forum.AuthorType;
      votes?: Forum.VoteType;
      voteCount?: number;
      comments?: Forum.CommentType[];
      commentCount?: number;
      tags?: any[];
      imageUrls?: string[];
      createdAt?: string;
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
      mintingTimeTimeStamp: number;
      mintingUrl?: string;
      description?: string;
      collectionSlug: string;
      mintingPrice?: string;
      mintingPriceSymbol?: string;
      category?: string;
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

    type UnconfirmedType = {
      id: number;
      name: string;
      discordUrl: string | null;
      twitterHandle: string | null;
    };
  }
}

export {};
