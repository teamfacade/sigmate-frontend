import React from 'react';

declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare interface StringKeyObj<T> {
  [index: string]: T;
}
