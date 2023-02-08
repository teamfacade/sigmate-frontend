import { KeyInfoTitles, KeyInfoDataNames } from 'lib/main/wiki/constants';

export const createCollectionJSON: (
  elements: HTMLFormControlsCollection
) => Wiki.EditableKeyInfosType = (elements) => {
  const collection: Wiki.EditableKeyInfosType = {};

  KeyInfoTitles.forEach((title, index) => {
    const componentName = title.split(' ')[0];
    switch (componentName) {
      case 'Name':
      case 'Thumbnail':
        break;
      case 'Category':
        collection.category = (
          elements.namedItem(componentName) as HTMLSelectElement
        ).value;
        break;
      default:
        collection[KeyInfoDataNames[index]] = (
          elements.namedItem(componentName) as HTMLTextAreaElement
        ).value;
    }
  });

  return collection;
};
