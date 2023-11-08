import { Response } from "express";
import request from "supertest";
import { app } from "../../app";

describe("/seasons", () => {
  describe("GET /seasons", () => {
    it("respond with json containing a list of seasons", async () => {
      await request(app)
        .get("/seasons")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200);
    });
  });

  describe("POST /seasons", () => {
    it("respond with 400 with missing data", async () => {
      const verifySeasonValidation = (res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            error: expect.arrayContaining([
              expect.objectContaining({
                location: "body",
                path: "startDate",
                msg: "startDate is a required field",
                type: "field",
              }),
              expect.objectContaining({
                location: "body",
                path: "sportTypeId",
                msg: "sportTypeId is a required field",
                type: "field",
              }),
            ]),
          })
        );
      };

      await request(app)
        .post("/seasons")
        .set("Accept", "application/json")
        .send({})
        .expect("Content-type", /json/)
        .expect(400)
        .expect(verifySeasonValidation);
    });
  });


});
