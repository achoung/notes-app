import React, { useState, useEffect } from 'react';
import NoteService from '../../services/notes';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditNote() {
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: '',
        id: '',
    });
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const getNote = async () => {
            if (params.id) {
                const res = await NoteService.fetchNote({ id: params.id });
                setNote({
                    title: res.data.title,
                    content: res.data.content,
                    date: new Date(res.data.date).toLocaleDateString(),
                    id: res.data._id,
                });
            }
        };
        getNote();
    }, [params.id]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value });
    };

    const editNote = async (e) => {
        e.preventDefault();
        try {
            const updatedNoteData = {
                ...note,
                ...{
                    date: new Date().getTime(),
                },
            };
            await NoteService.updateNote(updatedNoteData);
            toast('Edited note successfully!');
            navigate('/');
        } catch (err) {
            toast(`Edit note failed! Error: ${err?.data?.msg || ''}`);
        }
    };

    return (
        <div className="note-container">
            <h3>Edit Note</h3>
            <form onSubmit={editNote} autoComplete="off">
                <div className="mb-3">
                    <label
                        id="edit-note-title-label"
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
                        aria-describedby="edit-note-title-label"
                    />
                </div>

                <div className="mb-3">
                    <label
                        id="edit-note-content-label"
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
                        aria-describedby="edit-note-content-label"
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
