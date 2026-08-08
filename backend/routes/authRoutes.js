const express = require("express");
const passport = require("passport");
const { body } = require("express-validator");

const router = express.Router();

const validate = require("../middleware/validationMiddleware");
const authLimiter = require("../middleware/rateLimitMiddleware");
const requireAuth = require("../middleware/authMiddleware");

const {

  registerUser,

  loginUser,

  getMe,

  deleteAccount

} = require("../controllers/authController");

// -------------------------
// Validation
// -------------------------

const registerValidation = [

  body("name")

    .notEmpty()

    .withMessage("Name is required."),

  body("email")

    .isEmail()

    .withMessage("Enter a valid email."),

  body("password")

    .isLength({ min: 6 })

    .withMessage(

      "Password must be at least 6 characters."

    )

];

const loginValidation = [

  body("email")

    .isEmail()

    .withMessage("Enter a valid email."),

  body("password")

    .notEmpty()

    .withMessage("Password is required.")

];

// -------------------------
// Existing Routes
// -------------------------

router.post(

  "/register",

  authLimiter,

  registerValidation,

  validate,

  registerUser

);

router.post(

  "/login",

  authLimiter,

  loginValidation,

  validate,

  loginUser

);

// -------------------------
// Profile / Account
// -------------------------

router.get(
  "/me",
  requireAuth,
  getMe
);

router.delete(
  "/me",
  requireAuth,
  deleteAccount
);

// -------------------------
// Google Login
// -------------------------

router.get(

  "/google",

  passport.authenticate("google", {

    scope: ["profile", "email"]

  })

);

router.get(

  "/google/callback",

  passport.authenticate("google", {

    failureRedirect: `${process.env.FRONTEND_URL || "http://localhost:5173"}/login`,

    session: false

  }),

  (req, res) => {

    const token = req.user.jwtToken;

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    res.redirect(

      `${frontendUrl}/oauth-success?token=${token}`

    );

  }

);

module.exports = router;