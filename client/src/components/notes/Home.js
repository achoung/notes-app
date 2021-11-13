import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NoteService from '../../services/notes';
import moment from 'moment';

export default function Home() {
    const [notes, setNotes] = useState([]);

    const navigate = useNavigate();

    const getNotes = async () => {
        const res = await NoteService.fetchAllNotes();
        setNotes(res.data);
    };

    useEffect(() => {
        getNotes();
    }, []);

    const deleteNote = async (id) => {
        try {
            await NoteService.deleteNote({ id });
            getNotes();
        } catch (error) {
            window.location.href = '/';
        }
    };

    return (
        // <div className="container">
        <div className="row row-cols-auto">
            {notes.map((note) => {
                const fmtDate = moment(note.date).format(
                    'MM/DD/YYYY hh:mm:ss A'
                );
                return (
                    <div className="cols" key={note._id}>
                        <div className="card custom-note-card">
                            <div className="card-body">
                                <h4 className="card-title card-header">
                                    {note.title}
                                </h4>
                                <div className="card-text custom-note-card-content">
                                    <p>{note.content}</p>
                                </div>
                                <p className="card-text custom-card-date">
                                    Last Updated: {fmtDate}
                                </p>
                                <div className="d-flex justify-content-end card-footer">
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() =>
                                            navigate(`edit/${note._id}`)
                                        }
                                    >
                                        <i className="fa fa-edit me-2" />
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-outline-danger ms-2"
                                        onClick={() => deleteNote(note._id)}
                                    >
                                        <i className="fa fa-trash me-2" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
        // </div>
    );
}
