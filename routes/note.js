const express = require ('express');
const { addNote, getNotes, deleteNote, updateNote } = require('../controllers/note');
const accountTypeCheck = require('../middleware/roles');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, accountTypeCheck('student'), addNote );
router.get('/', protect, accountTypeCheck('student'), getNotes ); 
router.delete('/:id', protect, accountTypeCheck('student'), deleteNote ); 
router.put('/:id', protect, accountTypeCheck('student'), updateNote ); 

module.exports = router;

