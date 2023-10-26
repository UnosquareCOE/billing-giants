import { when } from "jest-when";
import { seasonsController } from "../seasons";
import { mockRequest, mockResponse } from "../../test-utils/mockExpress";
import { prismaAsAny } from "../../test-utils/prisma";
import { seasonService } from "../../services/seasons";

jest.mock("@prisma/client");
jest.mock("../../services/seasons");

describe("seasons controller", () => {
  describe("getAll", () => {
    it("should return 200 when seasons are available", async () => {
      // arrange
      const req = mockRequest({ query: { } });
      const res = mockResponse();

      const seasons = [
        { start_date: new Date(), id: 1, sport_type_id: 1, end_date: null },
      ];

      when(seasonService.getAll)
        .calledWith(undefined)
        .mockReturnValueOnce(Promise.resolve(seasons));

      // act
      await seasonsController.getAll(req, res);

      // assert
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(seasons);
    });
  });

  describe("getSingle", () => {
    it("should return a season when the id exists", async () => {
      // arrange
      const seasonId = 1;
      const req = mockRequest({ params: { seasonId } });
      const res = mockResponse();

      const season = {
        start_date: new Date(),
        id: seasonId,
        sport_type_id: 1,
        end_date: null,
      };

      const findUnique = jest.fn();
      when(findUnique)
        .calledWith({
          where: { id: seasonId },
        })
        .mockReturnValueOnce(Promise.resolve(season));

      prismaAsAny.seasons = {
        findUnique,
      };

      // act
      await seasonsController.getSingle(req, res);

      // assert
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(season);
    });
  });
});
