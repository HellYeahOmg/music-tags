import React from "react";
import { withApollo } from "react-apollo";
import taglist from "./queries/taglist";

class Tags extends React.Component {
  state = {};
  componentDidMount = () => {
    this.props.client
      .query({
        query: taglist
      })
      .then(data => console.log(data));
  };
  render() {
    return <p>hello</p>;
  }
}

export default withApollo(Tags);
