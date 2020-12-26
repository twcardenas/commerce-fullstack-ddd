
import http from "http";
import path from "path";
import bodyParser from "body-parser";
import { ApolloServer, PubSub } from "apollo-server-express";
import express from "express";
import { resolvers } from './resolvers';
import { typeDefs } from './type-defs';
import { SubscriptionServer } from 'subscriptions-transport-ws';

export const pubsub = new PubSub();
const apolloServer = new ApolloServer({ 
    resolvers, 
    typeDefs,
    context: {
        pubsub
    },
    subscriptions: {
      onConnect: () => console.log('Connected to websocket'),
    } });

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
apolloServer.applyMiddleware({ app, path: "/graphql" });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

const PORT = 4000;
httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`)
  })
