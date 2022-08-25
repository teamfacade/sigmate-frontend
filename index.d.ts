import React from 'react';
import { ActionMeta, MultiValue } from 'react-select';

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

  type MultiSelectChangeEventHandler = (
    option: MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => void;
}
