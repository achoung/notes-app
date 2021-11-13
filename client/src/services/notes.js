import axios from 'axios';
import { API, generateAuthHeader } from './utils';

const NoteService = {
    fetchAllNotes() {
        return axios.get(API.NOTES, { headers: generateAuthHeader() });
    },

    fetchNote({ id = '' }) {
        return axios.get(`${API.NOTES}/${id}`, {
            headers: generateAuthHeader(),
        });
    },

    createNote(data = {}) {
        return axios.post(API.NOTES, data, { headers: generateAuthHeader() });
    },

    updateNote(data = {}) {
        const { id, ...postData } = data;
        return axios.put(`${API.NOTES}/${id}`, postData, {
            headers: generateAuthHeader(),
        });
    },

    deleteNote({ id = '' }) {
        return axios.delete(`${API.NOTES}/${id}`, {
            headers: generateAuthHeader(),
        });
    },
};

export default NoteService;
