const venueDefs = `
  type Venue {
    id: Int!,
    name: String!
  }

  type Mutation {
    createVenue(name: String!) : Venue!
  }

  type Query {
    allVenues: [Venue!]!
  }
`;

export { venueDefs };