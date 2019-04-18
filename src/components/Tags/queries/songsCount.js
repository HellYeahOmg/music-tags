import gql from "graphql-tag";

export default gql`
  query($valueIds: [Int]) {
    demoMediafilesCount(valueIds: $valueIds)
  }
`;
