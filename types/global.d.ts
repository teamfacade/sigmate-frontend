import { ActionMeta, MultiValue, SingleValue } from 'react-select';

declare global {
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

  type VoteType = {
    voted: string;
    timestamp: string;
  };

  type ProfileType = {
    PFPUrl: string;
    username: string;
    displayName: string;
    bio: string;
    level: number;
    twitterID?: string;
    discordID?: string;
  };
}

export {};
