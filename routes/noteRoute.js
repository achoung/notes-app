const router = require('express').Router();
const auth = require('./../middleware/auth');
const noteController = require('./../controllers/noteController');

// fetch all notes
router.get('/', auth, noteController.getNotes);

// create a new note
router.post('/', auth, noteController.createNote);

// fetch, update, or delete an existing note
router.get('/:id', auth, noteController.getNote);
router.put('/:id', auth, noteController.updateNote);
router.delete('/:id', auth, noteController.deleteNote);

module.exports = router;
