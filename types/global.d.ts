import { ActionMeta, MultiValue, SingleValue } from 'react-select';

declare global {
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
    twitterUrl?: string;
    discordID?: string;
  };
}

export {};
