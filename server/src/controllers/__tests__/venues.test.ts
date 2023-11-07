import { when } from "jest-when";
import { venuesController } from "../venues";
import { mockRequest, mockResponse } from "../../test-utils/mockExpress";
import { venuesService } from "../../services/venues";
import { prismaAsAny } from "../../test-utils/prisma";

jest.mock("../../services/venues");

describe("venues controller", () => {
    describe("getAll", () => {
        it("should return 200 when venues are available", async () => {
            // arrange
            const req = mockRequest();
            const res = mockResponse();

            const venues = [
                { id: 1, name: "hello" },
            ];

            when(venuesService.getAll)
                .calledWith()
                .mockReturnValueOnce(Promise.resolve(venues));

            // act
            await venuesController.getAll(req, res);

            // assert
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(venues);
        });
    });

    describe("getSingle", () => {
        it("should return a venue when the id exists", async () => {
            // arrange
            const venueId = 1;
            const req = mockRequest({ params: { venueId } });
            const res = mockResponse();

            const venue = {
                id: venueId,
                name: "Storm"
            };

            when(venuesService.getSingle)
                .calledWith(venueId)
                .mockReturnValueOnce(Promise.resolve(venue));

            // act
            await venuesController.getSingle(req, res);

            // assert
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(venue);
        });
    });
});
