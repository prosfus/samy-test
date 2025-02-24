import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import "./index.css";
import ImagesList from "./App";

const client = new ApolloClient({
  uri: "https://sandbox-api-test.samyroad.com/graphql",
  cache: new InMemoryCache(),
});

export const filterVar = makeVar({
  search: "",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ImagesList />
    </ApolloProvider>
  </StrictMode>
);
