const express = require('express');
const router = express.Router();
const imageController = require('../controller/imageGenerateController');

router.post('/imageGeneration', imageController.imageGenerate);
router.get('/renderHome', imageController.renderHome);

module.exports = router;
