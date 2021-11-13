const Notes = require('./../models/noteModel');

/**
 * Fetches all notes by a user.
 */
async function getNotes(req, res) {
    try {
        /**
         * TODO:
         * - Add pagination for scalability
         * - Add fetch by searching note "title"
         * - Add sorting to fetched results
         */
        const notes = await Notes.find({ user_id: req.user.id }).lean();
        res.json(notes);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

/**
 * Fetch a note by note id.
 */
async function getNote(req, res) {
    try {
        const note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(400).json({ msg: 'Note does not exist' });
        }

        res.json(note);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

/**
 * Create and persist a new note by user id.
 */
async function createNote(req, res) {
    try {
        const { title, content, date } = req.body;

        const newNote = new Notes({
            user_id: req.user.id,
            title,
            content,
            date,
        });

        await newNote.save();
        res.json({ msg: 'Created Note' });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

/**
 * Delete a note by note id.
 *
 * NOTE: If note is already deleted, return successful to keep this idempotent.
 */
async function deleteNote(req, res) {
    try {
        await Notes.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Deleted note' });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

/**
 * Update a note by note id.
 */
async function updateNote(req, res) {
    try {
        const result = await Notes.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );

        if (!result) {
            return res.status(400).json({ msg: 'Note does not exist' });
        }

        res.json(result);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = {
    getNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote,
};
