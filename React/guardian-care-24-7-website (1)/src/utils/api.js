
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.detail || 'Something went wrong');
    }
    return response.json();
};

export const api = {
    get: async (endpoint) => {
        const response = await fetch(`${API_BASE_URL}/${endpoint}/`);
        return handleResponse(response);
    },
    post: async (endpoint, data) => {
        const response = await fetch(`${API_BASE_URL}/${endpoint}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    }
};
