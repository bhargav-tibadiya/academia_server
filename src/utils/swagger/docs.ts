// ---------->> AUTH <<----------

// -----> AUTH.SCHEMAS <-----


// -----> AUTH.SIGNUP <-----
/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@email.com
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 example: student
 *               otp:
 *                 type: string
 *                 example: abcd1234
 *     responses:
 *       201:
 *         description: User has been created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "User authenticated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67c09b67191a749b67191a74"
 *                     email:
 *                       type: string
 *                       example: "example@mail.com"
 *                     password:
 *                       type: string
 *                       example: "password123"
 *                     role:
 *                       type: string
 *                       example: "student"
 *                     status:
 *                       type: string
 *                       example: "none"
 *                     createdAt:
 *                       type: string
 *                       example: "2025-02-27T17:05:43.338Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2025-02-27T17:05:43.338Z"
 *                     userId:
 *                       type: string
 *                       example: "10"
 */


// -----> AUTH.LOGIN <-----
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "User authenticated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67c09b67191a749b67191a74"
 *                     email:
 *                       type: string
 *                       example: "example@mail.com"
 *                     password:
 *                       type: string
 *                       example: "password123"
 *                     role:
 *                       type: string
 *                       example: "student"
 *                     status:
 *                       type: string
 *                       example: "none"
 *                     createdAt:
 *                       type: string
 *                       example: "2025-02-27T17:05:43.338Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2025-02-27T17:05:43.338Z"
 *                     userId:
 *                       type: string
 *                       example: "10"
 *                     token:
 *                       type: string
 *                       example: "jwt_token"
 */



// -----> AUTH.SEND_OTP <-----
/**
 * @swagger
 * /api/v1/auth/sendOtp:
 *   post:
 *     summary: Send verification OTP email to user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "OTP sent successfully."
 */
