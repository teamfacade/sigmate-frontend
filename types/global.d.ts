import { ActionMeta, MultiValue, SingleValue } from 'react-select';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';

declare global {
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

  type CommentType = {
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

  type VoteType = {
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
    profile: {
      id: number;
      displayName: string | null;
      bio: string | null;
      profileImage: Image | null;
      profileImageUrl: string | null;
    };
  };

  type ForumCommentType = {
    id: number;
    PFPUrl: string;
    author: string;
    text: string;
    replies: ForumCommentType[];
    recommend: number;
  };

  type ForumArticleType = {
    id: number;
    category: string;
    recommend: number;
    author: string;
    tags: string[];
    timestamp: string;
    title: string;
    content: string;
    imageURL: string;
  };

  type ForumSearchFilter = 'Category' | 'Title' | 'Content';

  type ForumCommentReportType = {
    type: 'comment' | 'reply';
    id: number;
  };

  namespace Forum {
    type ForumArticleContentType = {
      title: string;
      content: string;
      imageURL: string;
      tags: string[];
    };
  }
}

export {};
