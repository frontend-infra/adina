export default {
  home: {
    path: '/',
    title: 'Feed'
  },
  pokemon: {
    path: '/pokemon',
    title: 'Pokémon',
    data: [
      { url: 'https://pokeapi.co/api/v2/pokemon?limit=2000' },
      {
        url: 'https://graphql-pokeapi.graphcdn.app',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query pokemons($limit: Int, $offset: Int) {
            pokemons(limit: $limit, offset: $offset) {
              results {
                id
                url
                name
                artwork
              }
            }
          }`,
          variables: { limit: 2000, offset: 0 }
        })
      }
    ],
    preconnect: ['https://raw.githubusercontent.com']
  }
}
