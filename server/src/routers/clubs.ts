import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validation } from "../utils/validation";
import { clubsController } from "../controllers/clubs";

const clubsRouter = Router();


/**
 * @swagger
 * /clubs:
 *   get:
 *     tags: [
 *       clubs
 *     ]
 *     summary: Returns an array of clubs
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 2, "name": "Manchester United" },
 *                       { "id": 1, "name": "Belfast Giants" }]'
 *       204:
 *         description: No content
 */
clubsRouter.get("/", clubsController.getAll);

/**
 * @swagger
 * /clubs/{clubId}:
 *   get:
 *     tags: [
 *       clubs
 *     ]
 *     summary: Returns a single club
 *     parameters:
 *       - name: clubId
 *         in: path
 *         type: integer
 *         description: The ID of the requested club.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1, "name": "Belfast Giants" }'
 *       204:
 *         description: No content
 */
clubsRouter.get("/:clubId(\\d+)", clubsController.getSingle);

/**
 * @swagger
 * /clubs:
 *   post:
 *     tags: [
 *       clubs
 *     ]
 *     summary: Creates a new club
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: Name of the club.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: club Created
 */
clubsRouter.post(
  "/",
  [
    body("name").isLength({ min: 3 }).withMessage("the club name must have minimum length of 3").trim()
  ],
  validation.validate,
  clubsController.create
);

/**
 * @swagger
 * /clubs/{clubId}:
 *   put:
 *     tags: [
 *       clubs
 *     ]
 *     summary: Updates an existing club
 *     parameters:
 *       - name: clubId
 *         in: path
 *         type: integer
 *         description: The ID of the requested club.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: Name of the club.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: club Created
 */
clubsRouter.put(
  "/:clubId(\\d+)",
  [
    body("name").isLength({ min: 3 }).withMessage("the club name must have minimum length of 3").trim()
  ],
  validation.validate,
  clubsController.update
);

/**
 * @swagger
 * /clubs/{clubId}:
 *   delete:
 *     tags: [
 *       clubs
 *     ]
 *     summary: Deletes an existing club
 *     parameters:
 *       - name: clubId
 *         in: path
 *         type: integer
 *         description: The ID of the requested club.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: club Deleted
 */
clubsRouter.delete("/:clubId(\\d+)", clubsController.deleteSingle);

export { clubsRouter };
