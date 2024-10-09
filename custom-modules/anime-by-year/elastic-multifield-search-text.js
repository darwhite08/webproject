const client = require('../elastic-search/client');

// Search across anime_name and anime_plot
async function searchAnime(query) {
  const response = await client.search({
    index: 'anime',
    query: {
      multi_match: {
        query: query,
        fields: ['anime_name', 'anime_plot'], // Fields to search in
      },
    },
  });

  console.log('Multi-field Search Results:', response.hits.hits);
}

module.exports = {
    searchAnime
}
