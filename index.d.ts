import React from 'react';
import { ActionMeta, SingleValue, MultiValue } from 'react-select';

declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare interface StringKeyObj<T> {
  [index: string]: T;
}

declare namespace ReactSelectTypes {
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
