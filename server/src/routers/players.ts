import { Router } from "express";
import { playersController } from "../controllers/players"
import { body } from "express-validator";
import { validation } from "../utils/validation";

const playerRouter = Router();

/**
 * @swagger
 * /players:
 *   get:
 *     tags: [
 *       players
 *     ]
 *     summary: Returns an array of players
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "name": "John Smith"},
 *                       { "id": 2, "name": "Peter czek"}]'
 */
playerRouter.get("/", playersController.getAll);

/**
 * @swagger
 * /players/{playerId}:
 *   get:
 *     tags: [
 *       players
 *     ]
 *     summary: Returns a single player
 *     parameters:
 *       - name: playerId
 *         in: path
 *         type: integer
 *         description: The ID of the requested player.
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
playerRouter.get("/:playerId(\\d+)", playersController.getSingle);

/**
 * @swagger
 * /players:
 *   post:
 *     tags: [
 *       players
 *     ]
 *     summary: Creates a new player
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The name for the player.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: player Created
 */
playerRouter.post(
    "/",
    [
        body("name").isLength({ min: 5, max: 50 }).withMessage("name is a required field")
    ],
    validation.validate,
    playersController.create
);

/**
 * @swagger
 * /players/{playerId}:
 *   put:
 *     tags: [
 *       players
 *     ]
 *     summary: Creates a new player
 *     parameters:
 *       - name: playerId
 *         in: path
 *         type: integer
 *         description: The ID of the requested player.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The name for the player.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: player updated
 */
playerRouter.put(
    "/:playerId(\\d+)",
    [
        body("name").isLength({ min: 5, max: 50 }).withMessage("name is a required field")
    ],
    validation.validate,
    playersController.update
);

/**
 * @swagger
 * /players/{playerId}:
 *   delete:
 *     tags: [
 *       players
 *     ]
 *     summary: Deletes an existing player
 *     parameters:
 *       - name: playerId
 *         in: path
 *         type: integer
 *         description: The ID of the requested player.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: player Deleted
 */
playerRouter.delete("/:playerId(\\d+)", playersController.deleteSingle);

export { playerRouter }