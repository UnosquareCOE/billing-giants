import { Response } from "express";
import request from "supertest";
import { app } from "../../app";

describe("/players", () => {
  describe("GET /players", () => {
    it("respond with json containing a list of players", async () => {
      await request(app)
        .get("/players")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200);
    });
  });

  describe("POST /players", () => {
    it("respond with 400 with missing data", async () => {
      const verifyplayerValidation = (res) => {
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
        .post("/players")
        .set("Accept", "application/json")
        .send({})
        .expect("Content-type", /json/)
        .expect(400)
        .expect(verifyplayerValidation);
    });
  });


});
