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
 *                 value: '[{ "user_id": 1, "first_name": "Andrew", "second_name": "Taylor", "email": "andrewtaylor@gmail.com", "password": "pa$$word" }, { "user_id": 2, "first_name": "Andy", "second_name": "Tyler", "email": "andytyler@gmail.com", "password": "passw0rd" }]'
 *       204:
 *         description: No content
 */
usersRouter.route("/").get(usersController.getUsers);

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
      body("password").isString().withMessage("password is required").trim()
    ],
    validation.validate,
    usersController.createUser
  );
/**
 * @swagger
 * /users/{user_id}:
 *   put:
 *     tags: [
 *       users
 *     ]
 *     summary: Update a user by user ID
 *     parameters:
 *      - name: user_id
 *        in: path
 *        type: interger
 *        description: The ID of the requested user
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              first_name:
 *                type: string
 *                required: true
 *                descriptions: The users first name
 *              second_name:
 *                type: string
 *                required: true
 *                descriptions: The users second name
 *               name: Email:
 *                in: query
 *                type: string
 *                description: The users email
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
 *                 value: '[{ "first_name": "new_f_name", "second_name": "new_l_name","email": "new_email", "password": "new_password"}]'
 *       204:
 *         description: No content
 */
// usersRouter
//   .route("/:user_id(\\d+)")
//   .put(
//     [
//       body("first_name")
//         .isString()
//         .isLength({ min: 3 })
//         .withMessage("the first_name must have minimum length of 3")
//         .trim(),
//       body("second_name")
//         .isString()
//         .isLength({ min: 3 })
//         .withMessage("the second_name must have minimum length of 3")
//         .trim(),
//       body("email")
//         .isString()
//         .isLength({ min: 5 })
//         .withMessage("the email must be in correct email format")
//         .trim(),
//       body("password").isString().withMessage("password is required.").trim()
//     ],
//     validationUtils.validate,
//     usersController.updateUser
//   );
// /**
//  * @swagger
//  * /users/{user_id}:
//  *   get:
//  *     tags: [
//  *       users
//  *     ]
//  *     summary: Returns a user by user ID
//  *     parameters:
//  *      - name: user_id
//  *        in: path
//  *        type: interger
//  *        description: The ID of the requested user
//  *     responses:
//  *       200:
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             examples:
//  *               jsonObject:
//  *                 summary: An example JSON response
//  *                 value: '[{ "user_id": 1, "first_name": "Andrew", "second_name": "Taylor", "email": "andrewtaylor@gmail.com", "password": "pa$$word" }, { "user_id": 2, "first_name": "Andy", "second_name": "Tyler",  "andytyler@gmail.com","password": "passw0rd" }]'
//  *       204:
//  *         description: No content
//  */
// usersRouter.route("/:user_id(\\d+)").get(usersController.getUserById);

export { usersRouter };