import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // On mount, try to restore session from localStorage
    useEffect(() => {
        const token = localStorage.getItem('zhiwang_token');
        if (token) {
            authApi.me()
                .then(setUser)
                .catch(() => {
                    localStorage.removeItem('zhiwang_token');
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (username, password) => {
        const data = await authApi.login(username, password);
        localStorage.setItem('zhiwang_token', data.access_token);
        const me = await authApi.me();
        setUser(me);
        return me;
    };

    const register = async (username, email, password) => {
        await authApi.register(username, email, password);
        return login(username, password);
    };

    const logout = () => {
        localStorage.removeItem('zhiwang_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
