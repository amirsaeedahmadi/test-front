import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    token: string | null;
    role: string | null;
    setToken: (token: string | null) => void;
    setRole: (role: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>('USER');

    return (
        <AuthContext.Provider value={{ token, role, setToken, setRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};