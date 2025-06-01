import type { Blog } from '@src/types';

const query = {
  query: `{
    publication(id: "${import.meta.env.HASHNODE_PUBLICATION_ID}") {
      title
      favicon
      headerColor
      about{
        text
      }
      author {
        id
        profilePicture
        name
        bio{ text }
        socialMediaLinks{
          instagram
          linkedin
        }
      }
    }
  }`
}


const getBlogData = async () => {
  const response = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query)
  });

  const json = await response.json();

  const { headerColor, ...res } = json.data.publication;

  return {
    ...res,
    themeColor: headerColor,
  } as Blog;
};

export default getBlogData;
