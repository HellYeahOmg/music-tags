import gql from "graphql-tag";

export default gql`
  {
    demoValues(attributeId: 7) {
      title
      id
      childs {
        id
        title
      }
    }
  }
`;
