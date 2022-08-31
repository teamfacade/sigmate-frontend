const ExVerdict: VerdictType = {
  verify: 2400,
  warning: 351,
  voted: '',
  comments: [
    {
      id: 1,
      username: 'jmyung0803',
      comment: 'This is not a fraud!',
    },
    {
      id: 2,
      username: 'limeAhn',
      comment: 'This is not a fraud!',
    },
    {
      id: 3,
      username: 'kwang jin',
      comment: 'This is a fraud!',
    },
  ],
};

const ExBlocks: BlockType[] = [
  {
    id: 1,
    tag: 'p',
    content:
      'the cites of the word in classical literature, discovere\n' +
      'of "de Finibus Bonorum et Malorum" (The Extremes of G\n' +
      'ethics, very popular during the Renaissance. The first \n' +
      'line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    verdict: ExVerdict,
  },
  {
    id: 2,
    tag: 'h',
    content: 'Content',
    verdict: { ...ExVerdict, warning: 2500 },
  },
  {
    id: 3,
    tag: 'p',
    content:
      'the cites of the word in classical literature, discovere\n' +
      'of "de Finibus Bonorum et Malorum" (The Extremes of G\n' +
      'ethics, very popular during the Renaissance. The first \n' +
      'line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    verdict: { ...ExVerdict, warning: 3500 },
  },
  {
    id: 4,
    tag: 'p',
    content:
      'the cites of the word in classical literature, discovere\n' +
      'of "de Finibus Bonorum et Malorum" (The Extremes of G\n' +
      'ethics, very popular during the Renaissance. The first \n' +
      'line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    verdict: { ...ExVerdict, warning: 700 },
  },
];

export function getAllArticleTitles() {
  // @todo const titles = fetch....
  const titles = ['hush', 'empty'];

  return titles.map((title) => {
    return {
      params: {
        title,
      },
    };
  });
}

export function getArticleReadData(title: string) {
  /*
        Returns an object that has all needed data to render wiki page,
        which looks like this:

        {
            title: string;
            blocks: BlockType[];
            verdict: VerdictType;
        }
    */

  // @todo blocks, 검증 데이터 받아오기 --> blocks: fetch(.../title/...). 없는 글이면 빈 배열 반환.
  const blocks: BlockType[] = title === 'empty' ? [] : ExBlocks;

  return {
    title,
    blocks,
  };
}

export function getArticleEditData(title: string) {
  // @todo blocks 데이터 받아오기 --> blocks: fetch(.../title/...). 없는 글이면 빈 배열 반환.
  const blocks: BlockType[] = title === 'empty' ? [] : ExBlocks;

  return {
    title,
    blocks,
  };
}
