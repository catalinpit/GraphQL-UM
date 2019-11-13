const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('../src/generated/prisma-client');

//https://github.com/catalinpit/GraphQL-UM
//https://www.howtographql.com/graphql-js/6-authentication/
//https://developer.okta.com/blog/2019/05/29/build-crud-nodejs-graphql

const resolvers = {
    Query: {
        feed: (root, args, context) => {
            return context.prisma.links();
        }
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description
            }); 
        }
    }
};

const server = new GraphQLServer({
    typeDefs: './server/schema.graphql',
    resolvers,
    context: { prisma }
});

server.start(() => console.log(`The server runs on localhost:4000!`));