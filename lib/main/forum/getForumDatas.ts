const ExArticle = {
  tags: ['NFT', 'Bellybear'],
  title:
    'An ‘NFT’ digital image just sold for US$69 million \n' +
    '— but what is it?',
  content:
    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000\n\n Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000 Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literatur',
  imageURL: '',
};

export function getPrevArticleContent(
  category: string,
  articleID: string | undefined
): Forum.ArticleContentType {
  if (articleID === undefined) {
    return {
      title: '',
      content: '',
      tags: [],
      imageURL: '',
    };
  }
  // @todo fetch forum article content
  return {
    title: ExArticle.title,
    content: ExArticle.content,
    tags: ExArticle.tags,
    imageURL: ExArticle.imageURL,
  };
}
