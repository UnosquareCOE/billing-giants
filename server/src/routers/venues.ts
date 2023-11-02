import { Router } from "express";
import { venuesController } from "../controllers/venues"
import { body } from "express-validator";
import { validation } from "../utils/validation";

const venueRouter = Router();

/**
 * @swagger
 * /venues:
 *   get:
 *     tags: [
 *       venues
 *     ]
 *     summary: Returns an array of venues
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "name": "Hockey"},
 *                       { "id": 2, "name": "Football"}]'
 */
venueRouter.get("/", venuesController.getAll);

/**
 * @swagger
 * /venues/{venueId}:
 *   get:
 *     tags: [
 *       venues
 *     ]
 *     summary: Returns a single venue
 *     parameters:
 *       - name: venueId
 *         in: path
 *         type: integer
 *         description: The ID of the requested venue.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1, "name": "SSE" }'
 *       204:
 *         description: No content
 */
venueRouter.get("/:venueId(\\d+)", venuesController.getSingle);

/**
 * @swagger
 * /venues:
 *   post:
 *     tags: [
 *       venues
 *     ]
 *     summary: Creates a new venue
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The name for the venue.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: venue Created
 */
venueRouter.post(
    "/",
    [
        body("name").isLength({ min: 5, max: 50 }).withMessage("name is a required field")
    ],
    validation.validate,
    venuesController.create
);

export { venueRouter }