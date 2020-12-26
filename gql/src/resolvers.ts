import Axios from 'axios';
import { subscribe } from 'graphql';
import { pubsub } from './apollo-server';

function between(min:number, max:number) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}
export const resolvers = {
  Query: {
    test: (_:any, _2:any, {pubsub}:any) => {
      pubsub.publish('newOrder', {
        mutation: 'data',
        data: [{
          orderNumber: between(10, 2000)
        }]
    });
      return "sent"
    }
  },
  Subscription: {
    orders: {
      resolve: (message:any) => {
        console.log({message})
        return message
      },
      subscribe: () => pubsub.asyncIterator('orderComplete'),
    }
  },
};

function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}