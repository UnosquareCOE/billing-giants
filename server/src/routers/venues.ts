import { Router } from "express";
import { venuesController } from "../controllers/venues"

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

export { venueRouter }