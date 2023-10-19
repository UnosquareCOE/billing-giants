import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validation } from "../utils/validation";
import { seasonsController } from "../controllers/seasons";

const seasonRouter = Router();

/**
 * @swagger
 * /seasons:
 *   get:
 *     tags: [
 *       seasons
 *     ]
 *     summary: Returns an array of seasons
 *     parameters:
 *       - name: startDate
 *         in: query
 *         type: date
 *         description: start date for season
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "sportType": "Hockey", "startDate": "01/01/2024 00:00:00" },
 *                       { "id": 2, "sportType": "Football", "startDate": "11/11/2023 00:00:00" }]'
 *       204:
 *         description: No content
 */
seasonRouter.get("/", seasonsController.getAll);

/**
 * @swagger
 * /seasons/{seasonId}:
 *   get:
 *     tags: [
 *       seasons
 *     ]
 *     summary: Returns a single season
 *     parameters:
 *       - name: seasonId
 *         in: path
 *         type: integer
 *         description: The ID of the requested season.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1, "startDate": "2022-01-01", "endDate": "2022-12-10", "sportTypeId": 1 }'
 *       204:
 *         description: No content
 */
seasonRouter.get("/:seasonId(\\d+)", seasonsController.getSingle);

/**
 * @swagger
 * /seasons:
 *   post:
 *     tags: [
 *       seasons
 *     ]
 *     summary: Creates a new season
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: date
 *                 required: true
 *                 description: The start date for the season.
 *               endDate:
 *                 type: date
 *                 required: false
 *                 description: The end date for the season.
 *               sportTypeId:
 *                 type: integer
 *                 required: true
 *                 description: The sport type for the seasn.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Season Created
 */
seasonRouter.post(
  "/",
  [
    body("startDate").isDate().toDate().withMessage("startDate is a required field"),
    body("sportTypeId")
      .isNumeric()
      .withMessage("sportTypeId is a required field"),
  ],
  validation.validate,
  seasonsController.create
);

/**
 * @swagger
 * /seasons/{seasonId}:
 *   put:
 *     tags: [
 *       seasons
 *     ]
 *     summary: Updates an existing season
 *     parameters:
 *       - name: seasonId
 *         in: path
 *         type: integer
 *         description: The ID of the requested season.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: date
 *                 required: true
 *                 description: The start date for the season.
 *               endDate:
 *                 type: date
 *                 required: false
 *                 description: The end date for the season.
 *               sportTypeId:
 *                 type: integer
 *                 required: true
 *                 description: The sport type for the seasn.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Season Created
 */
seasonRouter.put(
  "/:seasonId(\\d+)",
  [
    body("startDate").isDate().withMessage("startDate is a required field"),
    body("sportTypeId")
      .isNumeric()
      .withMessage("sportTypeId is a required field"),
  ],
  validation.validate,
  seasonsController.update
);

/**
 * @swagger
 * /seasons/{seasonId}:
 *   delete:
 *     tags: [
 *       seasons
 *     ]
 *     summary: Deletes an existing season
 *     parameters:
 *       - name: seasonId
 *         in: path
 *         type: integer
 *         description: The ID of the requested season.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: Season Deleted
 */
seasonRouter.delete("/:seasonId(\\d+)", seasonsController.deleteSingle);

export { seasonRouter };
