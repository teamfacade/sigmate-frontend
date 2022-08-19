type BlockType = {
  id: number;
  tag: string;
  content: string;
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
  },
];

export function getAllArticleTitles() {
  /*
        Returns an array that looks like this:
        [
           {
             params: {
               title: 'Puuvilla Society'
             }
           },
           {
             params: {
               title: 'Bellygom'
             }
           },
           {
             params: {
               title: 'Hush'
             }
           }
         ]
    */

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

export function getArticleData(title: string) {
  /*
        Returns an object that has all needed data to render wiki page,
        which looks like this:

        {
            title: string;
            blocks: BlockType[];
        }
    */

  // @todo blocks 데이터 받아오기 --> blocks: fetch(.../title/...). 없는 글이면 빈 배열 반환.
  const blocks: BlockType[] = title === 'empty' ? [] : ExBlocks;

  return {
    title,
    blocks,
  };
}
