const query = {
  query: `{
    publication(id: "${import.meta.env.HASHNODE_PUBLICATION_ID}") {
      author {
        bio{ text }
        socialMediaLinks{
          instagram
          linkedin
        }
        profilePicture
        name
      }
    }
  }`
}

const getAuthorData = async () => {
  const response = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.HASHNODE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  })

  const json = await response.json();

  return json.data.publication.author;
}

export default getAuthorData;