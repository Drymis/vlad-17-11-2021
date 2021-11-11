var express = require('express');
var router = express.Router();

// makes available public directory for serving static content
router.use('/static', express.static('public'))

module.exports = router;
