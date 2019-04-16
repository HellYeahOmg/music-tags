import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Tags from "./components/Tags";

const client = new ApolloClient({
  uri: "https://my.muz-lab.ru/api/v1/graphql/",
  credentials: "same-origin",
  fetchOptions: {
    mode: "no-cors"
  }
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Tags />
      </ApolloProvider>
    );
  }
}

export default App;
