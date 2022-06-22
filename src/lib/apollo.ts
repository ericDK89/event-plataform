import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl4oort6a0jgn01xtag1jgbq3/master",
  cache: new InMemoryCache(),
});
