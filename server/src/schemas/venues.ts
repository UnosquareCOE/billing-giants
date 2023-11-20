const venueDefs = `
  type Venue {
    id: Int!,
    name: String!
  }

  type CreateVenueResponse {
    errors: [String]
    venue: Venue
  }

  type Mutation {
    CreateVenue(name: String!) : CreateVenueResponse!
  }

  type Query {
    allVenues: [Venue!]!
  }
`;

export { venueDefs };