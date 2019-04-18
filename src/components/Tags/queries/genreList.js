import gql from "graphql-tag";

export default gql`
  {
    demoValues(attributeId: 1) {
      title
      id
      childs {
        id
        title
      }
    }
  }
`;
