import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Cache leaderboard for 5 minutes
          leaderboard: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
});