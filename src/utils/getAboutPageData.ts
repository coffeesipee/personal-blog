import type { About } from '@src/types';

const query = {
  query: `{
    publication(id: "${import.meta.env.HASHNODE_PUBLICATION_ID}") {
      url
      staticPage(slug: "about") {
        id
        content{ markdown }
        slug
      }
    }
  }`
}

const getAboutPageData = async () => {
  const response = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.HASHNODE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query),
  });

  const json = await response.json();
  const pageData = json.data.publication.staticPage;
  const url = `${json.data.publication.url}/${pageData.slug}`;

  return {
    url,
    content: { markdown: pageData.content.markdown },
  } as About;
};

export default getAboutPageData;
