import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoteService from '../../services/notes';

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
            toast('Created note successfully!');
            navigate('/');
        } catch (err) {
            toast(`Create note failed! Error: ${err?.data?.msg || ''}`);
        }
    };

    return (
        <div className="note-container">
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
                        data-test-id="create-note-title-field"
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
                        data-test-id="create-note-content-field"
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
                    <button
                        data-test-id="create-note-submit-btn"
                        className="btn btn-primary"
                        type="submit"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
