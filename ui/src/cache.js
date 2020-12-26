import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        visibilityFilter: {
          read() {
            return visibilityFilterVar();
          },
        },
      },
    },
  },
});

export const visibilityFilterVar = cache.makeVar("active");
