/**
 * API utility layer for 汁网
 * Reads JWT token from localStorage and attaches it to all authenticated requests.
 */

const BASE = '/api';

function getToken() {
    return localStorage.getItem('zhiwang_token');
}

async function request(method, path, { body, params } = {}) {
    let url = BASE + path;
    if (params) {
        const sp = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== '') sp.append(k, v);
        });
        const s = sp.toString();
        if (s) url += '?' + s;
    }

    const headers = { 'Content-Type': 'application/json' };
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: '网络请求失败' }));
        throw new Error(err.detail || '请求失败');
    }

    return res.json();
}

export const api = {
    get: (path, params) => request('GET', path, { params }),
    post: (path, body) => request('POST', path, { body }),
};

// Convenience helpers
export const authApi = {
    login: (username, password) => api.post('/auth/login', { username, password }),
    register: (username, email, password) => api.post('/auth/register', { username, email, password }),
    me: () => api.get('/auth/me'),
};

export const journalsApi = {
    list: () => api.get('/journals'),
    get: (id) => api.get(`/journals/${id}`),
};

export const articlesApi = {
    search: (q, category, page = 1) => api.get('/articles/search', { q, category, page }),
};

export const submissionsApi = {
    submit: (journalId, paperTitle, authorName) =>
        api.post('/submissions', { journal_id: journalId, paper_title: paperTitle, author_name: authorName }),
    mySubmissions: () => api.get('/submissions/my'),
};
