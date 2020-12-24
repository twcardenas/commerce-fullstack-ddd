import Axios from 'axios';
import { subscribe } from 'graphql';
import { pubsub } from './apollo-server';

export const resolvers = {
  Query: {
    test: (_:any, _2:any, {pubsub}:any) => {
      pubsub.publish('newMessage', {
        mutation: 'data',
        data: [{
          orderNumber: 123
        }]
    });
      return "sent"
    }
  },
  Subscription: {
    orders: {
      resolve: (message:any) => message,
      subscribe: () => pubsub.asyncIterator('newMessage'),
    }
  },
};

function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}