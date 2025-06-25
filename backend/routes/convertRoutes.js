// routes/convertRoutes.js
const express = require('express');
const { getConversion } = require('../controllers/convertController');
const router = express.Router();

router.get('/', getConversion); // e.g., GET /api/v1/convert?pair=USDGBP

module.exports = router;
