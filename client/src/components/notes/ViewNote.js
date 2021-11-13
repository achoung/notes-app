import React, { useState, useEffect } from 'react';
import NoteService from '../../services/notes';
import { useParams } from 'react-router-dom';

export default function ViewNote() {
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: '',
        id: '',
    });

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

    return (
        <div className="note-container">
            <div className="mb-3">
                <label
                    id="view-note-title-label"
                    htmlFor="title"
                    className="form-label"
                >
                    Title
                </label>
                <div id="title">{note.title}</div>
            </div>

            <div className="mb-3">
                <label
                    id="view-note-content-label"
                    htmlFor="content"
                    className="form-label"
                >
                    Content
                </label>
                <div id="content">{note.content}</div>
            </div>
        </div>
    );
}
