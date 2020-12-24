import { gql } from 'apollo-server-lambda';

export const typeDefs = gql`
type Query {
  test: String
}
  type Subscription {
    orders: SubscriptionPayload!
  }

  type SubscriptionPayload {
    mutation: String!
    data: [Order!]!
  }

  type Order {
    orderNumber: ID!
  }
`;
