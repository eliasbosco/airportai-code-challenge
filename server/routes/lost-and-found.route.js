/**
* App routes definitions.
*/
'use strict';

const express = require('express');
const router = express.Router();
const profile = require('../middleware/profile')
const { list, create, update, deleteOne } = require('../controllers/lost-and-found.controller');

// To confirm setup only.
router.get('/', profile, list);
router.post('/', profile, create);
router.put('/:id', profile, update);
router.delete('/:id', profile, deleteOne);

module.exports = router;
