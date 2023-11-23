import { Router } from "express";
import { usersController } from "../controllers/users";
import { validation } from "../utils/validation";
import { body } from "express-validator";

const usersRouter = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns an array of users with the user ID, name & password
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "firstName": "Andrew", "secondName": "Taylor", "email": "andrewtaylor@gmail.com", "password": "pa$$word" }, { "id": 2, "firstName": "Andy", "secondName": "Tyler", "email": "andytyler@gmail.com", "password": "passw0rd" }]'
 *       204:
 *         description: No content
 */
usersRouter.route("/").get(usersController.getUsers);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns a user by user ID
 *     parameters:
 *      - name: userId
 *        in: path
 *        type: interger
 *        description: The ID of the requested user
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1, "firstName": "Andrew", "secondName": "Taylor", "email": "andrewtaylor@gmail.com", "password": "pa$$word" }'
 *       204:
 *         description: No content
 */
usersRouter.route("/:userId(\\d+)").get(usersController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [
 *       users
 *     ]
 *     summary: Create a new user
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *                required: true
 *                descriptions: The users first name
 *              secondName:
 *                type: string
 *                required: true
 *                descriptions: The users last name
 *              email:
 *                type: string
 *                required: true
 *                descriptions: The users email address
 *              password:
 *                type: string
 *                required: true
 *                descriptions: The users password
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "firstName": "new_f_name", "secondName": "new_l_name", "email": "new_email", "password": "new_password"}]'
 *       204:
 *         description: No content
 */
usersRouter
  .route("/")
  .post(
    [
      body("firstName")
        .isString()
        .isLength({ min: 3 })
        .withMessage("the first_name must have minimum length of 3")
        .trim(),
      body("secondName")
        .isString()
        .isLength({ min: 3 })
        .withMessage("the second_name must have minimum length of 3")
        .trim(),
      body("email")
        .isString()
        .isLength({ min: 5 })
        .withMessage("the email must be in correct email format")
        .trim(),
      body("password").isString().withMessage("password is required").trim(),
    ],
    validation.validate,
    usersController.createUser
  );

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags: [
 *       users
 *     ]
 *     summary: Update a user by user ID
 *     parameters:
 *      - name: userId
 *        in: path
 *        type: interger
 *        description: The ID of the requested user
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *                required: true
 *                descriptions: The users first name
 *              secondName:
 *                type: string
 *                required: true
 *                descriptions: The users second name
 *              email:
 *                type: string
 *                required: true
 *                description: The users email
 *              password:
 *                type: string
 *                required: true
 *                description: The users password
 *     responses:
 *       204:
 *         description: No content
 */
usersRouter
  .route("/:userId(\\d+)")
  .put(
    [
      body("firstName")
        .isString()
        .isLength({ min: 3 })
        .withMessage("the first_name must have minimum length of 3")
        .trim(),
      body("secondName")
        .isString()
        .isLength({ min: 3 })
        .withMessage("the second_name must have minimum length of 3")
        .trim(),
      body("email")
        .isString()
        .isLength({ min: 5 })
        .withMessage("the email must be in correct email format")
        .trim(),
      body("password").isString().withMessage("password is required.").trim(),
    ],
    validation.validate,
    usersController.updateUser
  );

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags: [
 *       users
 *     ]
 *     summary: Deletes an existing user
 *     parameters:
 *       - name: userId
 *         in: path
 *         type: integer
 *         description: The ID of the requested user.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: user Deleted
 */
usersRouter.route("/:userId(\\d+)").delete(usersController.deleteUser);

export { usersRouter };
