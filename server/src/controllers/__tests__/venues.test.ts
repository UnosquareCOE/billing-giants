import { when } from "jest-when";
import { venuesController } from "../venues";
import { mockRequest, mockResponse } from "../../test-utils/mockExpress";
import { venuesService } from "../../services/venues";

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
});
