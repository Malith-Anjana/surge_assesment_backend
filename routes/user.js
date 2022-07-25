const express = require ('express');
const { register, signin, getUsers } = require('../controllers/user');
const protect = require('../middleware/authMiddleware');
const accountTypeCheck = require('../middleware/roles');
const router = express.Router()

router.post('/register', protect, register );
router.post('/signin', protect, accountTypeCheck('admin'), signin ); 
router.get('/', protect, accountTypeCheck('admin'), getUsers ); 


module.exports = router;