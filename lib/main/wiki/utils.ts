const createNewBlock: (element: string) => Wiki.DocumentBlockType = (
  element: string
) => {
  const newBlock = {
    id: Date.now(),
    element,
    textContent: '',
    verificationCounts: {
      verifyCount: 0,
      beAwareCount: 0,
    },
    opinionCount: 0,
  };
  newBlock.id *= -1;
  return newBlock;
};

export { createNewBlock };
