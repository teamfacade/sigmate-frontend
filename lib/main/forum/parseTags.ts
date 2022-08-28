/**
 * Remove the specified delimiter and ensure spaces between tags
 * @param {string} value User input value
 * @param {string} delimiter Character to separate by
 * @returns Cleaned value
 */
const separateBy = (value: string, delimiter: string) => {
  let cleanedValue = '';

  // Add space in front of delimiter
  let idx = 0;
  let pIdx = value.indexOf(delimiter, idx);
  while (pIdx >= 0) {
    cleanedValue += value.slice(idx, pIdx);
    if (
      pIdx > 0 && // Skip first tag
      value[pIdx - 1] !== ' ' &&
      pIdx - idx > 1 // Skip empty tags
    ) {
      cleanedValue += ' ';
    }

    idx = pIdx + 1;
    pIdx = value.indexOf(delimiter, idx);
  }

  // Anything remaining
  if (idx < value.length) {
    cleanedValue += value.slice(idx);
  }

  return cleanedValue;
};

/**
 * Reads the user input and returns an array of tags.
 * @param {string} value User input value
 * @returns Array of unique, non-empty tags
 */
const parseTags = (value: string) => {
  let parsedString = value;

  // Ensure spaces between separators
  parsedString = separateBy(parsedString, '#'); // ?
  parsedString = separateBy(parsedString, ',');
  parsedString = separateBy(parsedString, '/');
  parsedString = separateBy(parsedString, '|');

  // Clean extra whitespaces
  parsedString = parsedString.replace(/(\s){2,}/g, ' '); // consecutive whitespaces
  parsedString = parsedString.replace(/^(\s){1,}|(\s){1,}$/g, ''); // trailing whitespaces

  parsedString = parsedString.replace(/["';]/g, ''); // remove quotation, semicolons

  // Array of tags. Unique. Non-empty
  const tags = parsedString
    .split(' ')
    .filter((tag, idx, arr) => arr.indexOf(tag) === idx)
    .filter((tag) => tag !== '');

  // Return
  return tags;
};

export { parseTags };
