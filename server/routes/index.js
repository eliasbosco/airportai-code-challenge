/**
* App routes definitions.
*/
'use strict';

const express = require('express');
const router = express.Router();
const profile = require('../middleware/profile')

// To confirm setup only.
router.get('/', profile, async (req, res) => res.send({ message: 'Hello World!' }));

module.exports = router;
