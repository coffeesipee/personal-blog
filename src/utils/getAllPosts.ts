import type { Post, PostPreview } from '@src/types';

const query = (cursor: string, preview: boolean) => ({
  query: `{
    publication(id: "${import.meta.env.HASHNODE_PUBLICATION_ID}") {
      posts(first: 20, after: "${cursor}") {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            slug
            title
            publishedAt
            coverImage { url }
            brief
            subtitle
            ${preview ? '' : 'url'}
            ${preview ? '' : 'content { markdown }'}
            ${preview ? '' : 'readTimeInMinutes'}
          }
        }
      }
    }
  }`,
});

const fetchPosts = async (cursor: string, preview: boolean) => {
  const q = query(cursor, preview)
  const response = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(q),
  });

  const json = await response.json();

  return json;
};

const getAllPosts = async <T extends boolean>(
  preview: T,
): Promise<typeof preview extends true ? PostPreview[] : Post[]> => {
  let cursor = '';
  let hasNextPage = true;
  const postList = [];

  while (hasNextPage) {
    const { data } = await fetchPosts(cursor, preview);

    postList.push(
      ...data.publication.posts.edges.map(
        ({ node }: { node: Post | PostPreview }) => node,
      ),
    );

    cursor = data.publication.posts.pageInfo.endCursor;
    hasNextPage = data.publication.posts.pageInfo.hasNextPage;
  }

  return postList;
};

export default getAllPosts;
