import { ActionMeta, MultiValue, SingleValue } from 'react-select';
import { VerdictType } from '../lib/main/wiki/getWikiData';

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
