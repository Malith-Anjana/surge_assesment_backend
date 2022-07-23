const express = require ('express');
const { register, signin } = require('../controllers/users');
const protect = require('../middleware/authMiddleware');
const accountTypeCheck = require('../middleware/roles');
const router = express.Router()

router.post('/register/:id', protect, register );
router.post('/signin', protect, accountTypeCheck('admin'), signin ); //add protect middleware here

module.exports = router;