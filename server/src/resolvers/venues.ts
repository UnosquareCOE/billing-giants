import { object, string } from "yup";
import { venuesService } from "../services/venues";

interface VenueDetails {
    name: string
}

const venuesResolvers = {
    Query: {
      allVenues: () => {
        return venuesService.getAll();
      }
    },
    Mutation: {
      createVenue: {
        extensions: {
            validationSchema: object().shape({
                name: string()
                .trim()
                .required()
                .min(2, "Venue name must be longer than 2 characters"),
            })
        },
        resolve : async (parent: unknown, { name }: VenueDetails) => {
            return venuesService.create(name);
        }
      }
    }
  }

export { venuesResolvers };