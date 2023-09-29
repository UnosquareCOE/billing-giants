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

seasonRouter.get("/:seasonId(\\d+)", (req: Request, res: Response) => {
  const { seasonId } = req.params;
  res.json({ message: "Retrieve Single", value: seasonId }).status(200);
});

seasonRouter.post(
  "/",
  [
    body("name")
      .trim()
      .isLength({ min: 3})
      .withMessage("name must be a minumum of 3 characters"),
    body("email")
     .trim()
     .isEmail()
     .withMessage("A valid email must be supplied")
  ],
  validation.validate,
  (req: Request, res: Response) => {
    res.json({ message: "Season Created" }).status(201);
  }
);

seasonRouter.put("/:seasonId(\\d+)", (req: Request, res: Response) => {
  const { seasonId } = req.params;
  res.sendStatus(204);
});

seasonRouter.delete("/:seasonId(\\d+)", (req: Request, res: Response) => {
  const { seasonId } = req.params;
  res.sendStatus(204);
});

export { seasonRouter };
