import { Response } from "express";
import request from "supertest";
import { app } from "../../app";

describe("/venues", () => {
  describe("GET /venues", () => {
    it("respond with json containing a list of venues", async () => {
      await request(app)
        .get("/venues")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200);
    });
  });

  //   describe("POST /venues", () => {
  //     it("respond with 400 with missing data", async () => {
  //         const verifyvenueValidation = (res) => {
  //             expect(res.body).toEqual(
  //                 expect.objectContaining({
  //                     error: expect.arrayContaining([
  //                         expect.objectContaining({
  //                             location: "body",
  //                             path: "startDate",
  //                             msg: "startDate is a required field",
  //                         }),
  //                         expect.objectContaining({
  //                             location: "body",
  //                             path: "sportTypeId",
  //                             msg: "sportTypeId is a required field",
  //                         }),
  //                     ]),
  //                 })
  //             );
  //         };

  //         await request(app)
  //             .post("/venues")
  //             .set("Accept", "application/json")
  //             .send({})
  //             .expect("Content-type", /json/)
  //             .expect(400)
  //             .expect(verifyvenueValidation);
  //     });
  //   });


});