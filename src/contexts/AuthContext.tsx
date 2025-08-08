import React, { createContext, useContext, useState, useEffect } from 'react';
import { account, databases, DATABASE_ID, USERS_COLLECTION_ID } from '../services/appwrite';
import { ID, Query } from 'appwrite';
import { User, AuthContextType } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUser, getUser, loginUser } from '../utils/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthStatus()
    }, []);

    const checkAuthStatus = async () => {
        try {
            const user = await getUser();
            if (user) {
                setUser(user);
                setIsAuthenticated(true)
                setIsLoading(false)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    };

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const session = await loginUser(email, password);
            if (session) {
                const user = await getUser();
                setUser(user)
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            setIsLoading(true);
            const newUser = await createUser(email, password, name)

            if (newUser) {
                const n = await loginUser(email, password)
                if (n) {
                    const user = await getUser()
                    setUser(user);
                    setIsAuthenticated(true);
                }
            }

        } catch (error) {
            console.error('Register error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const value: AuthContextType = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
