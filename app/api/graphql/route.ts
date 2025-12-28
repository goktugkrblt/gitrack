import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '@/lib/graphql/schema';
import { resolvers } from '@/lib/graphql/resolvers';
import { NextRequest } from 'next/server';

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Enable GraphQL Playground
});

// Create Next.js handler
const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    // Context for resolvers
    return {
      req,
      // Add user auth here if needed later
    };
  },
});

// Export handlers for Next.js API routes
export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}