import {Router } from "express";
import { body } from "express-validator";
import { validation } from "../utils/validation";
import { authenticationController } from "../controllers/authentication";

const authenticationRouter = Router();

/**
 * @swagger
 * /authentication:
 *   post:
 *     tags: [
 *       authentication
 *     ]
 *     summary: Authenticates a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *                 description: The email for the user
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The password of the user
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       200:
 *         description: User Authenticated
 */

authenticationRouter
  .route("/")
  .post(
    [
      body("email")
        .isEmail()
        .withMessage("the email must be in email format")
        .trim(),
        body("password")
        .isLength({ min: 6, max: 16 })
        .withMessage(
          "your password should have min and max length between 8-15"
        )
    ],
    validation.validate,
    authenticationController.authenticateAction
  );

  export { authenticationRouter }