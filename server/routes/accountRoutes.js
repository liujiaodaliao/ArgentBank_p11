const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const tokenValidation = require("../middleware/tokenValidation");

router.get(
  "/account",
  tokenValidation.validateToken,
  accountController.getAccount
);

module.exports = router;
