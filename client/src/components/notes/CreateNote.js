import React, { useState } from 'react';
import NoteService from '../../services/notes';
import { useNavigate } from 'react-router-dom';

export default function CreateNote() {
    const [note, setNote] = useState({
        title: '',
        content: '',
    });
    const navigate = useNavigate();

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value });
    };

    const createNote = async (e) => {
        e.preventDefault();
        try {
            const { title, content } = note;
            const newNote = {
                title,
                content,
                date: new Date().getTime(),
            };

            await NoteService.createNote(newNote);

            navigate('/');
        } catch (err) {
            navigate('/');
        }
    };

    return (
        <div className="create-note">
            <h3>Create Note</h3>
            <form onSubmit={createNote} autoComplete="off">
                <div className="mb-3">
                    <label
                        id="create-note-title-label"
                        htmlFor="title"
                        className="form-label"
                    >
                        Title
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        value={note.title}
                        id="title"
                        name="title"
                        required
                        onChange={onChangeInput}
                        aria-label="Title"
                        aria-describedby="create-note-title-label"
                    />
                </div>

                <div className="mb-3">
                    <label
                        id="create-note-content-label"
                        htmlFor="content"
                        className="form-label"
                    >
                        Content
                    </label>
                    <textarea
                        className="form-control"
                        type="text"
                        value={note.content}
                        id="content"
                        name="content"
                        required
                        rows="10"
                        onChange={onChangeInput}
                        aria-label="Content"
                        aria-describedby="create-note-content-label"
                    />
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
