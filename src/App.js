import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Tags from "./components/Tags";

const client = new ApolloClient({
  uri: "http://admin.mv.muz-lab.ru/api/v1/graphql/",
  credentials: "same-origin"
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
