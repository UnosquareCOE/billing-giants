import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validation } from "../utils/validation";

const seasonRouter = Router();

seasonRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "Retrieve All" }).status(200);
});

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
