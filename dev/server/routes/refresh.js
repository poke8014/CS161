const express = require('express');
const router = express.Router();
const { handleRefreshToken } = require("../middleware/refreshTokenController")

router.get('/', handleRefreshToken)

module.exports = router