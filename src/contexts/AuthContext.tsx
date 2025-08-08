import React, { createContext, useContext, useState, useEffect } from 'react';
import { account, databases, DATABASE_ID, USERS_COLLECTION_ID } from '../services/appwrite';
import { ID, Query } from 'appwrite';
import { User, AuthContextType } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const session = await account.get();
            if (session) {
                // Get user data from database
                const userData = await databases.getDocument(
                    DATABASE_ID,
                    USERS_COLLECTION_ID,
                    session.$id
                );

                const user: User = {
                    $id: userData.$id,
                    email: userData.email,
                    name: userData.name,
                    bio: userData.bio,
                    avatar: userData.avatar,
                    createdAt: userData.$createdAt,
                };

                setUser(user);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.log('No active session');
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const session = await account.createEmailPasswordSession(email, password);

            // Get user data from database
            const userData = await databases.getDocument(
                DATABASE_ID,
                USERS_COLLECTION_ID,
                session.userId
            );

            const user: User = {
                $id: userData.$id,
                email: userData.email,
                name: userData.name,
                bio: userData.bio,
                avatar: userData.avatar,
                createdAt: userData.$createdAt,
            };

            setUser(user);
            setIsAuthenticated(true);
            await AsyncStorage.setItem('user', JSON.stringify(user));
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
            const account = await account.create(
                ID.unique(),
                email,
                password,
                name
            );

            // Create user document in database
            const userData = await databases.createDocument(
                DATABASE_ID,
                USERS_COLLECTION_ID,
                ID.unique(),
                {
                    email,
                    name,
                    bio: '',
                    avatar: '',
                }
            );

            const user: User = {
                $id: userData.$id,
                email: userData.email,
                name: userData.name,
                bio: userData.bio,
                avatar: userData.avatar,
                createdAt: userData.$createdAt,
            };

            setUser(user);
            setIsAuthenticated(true);
            await AsyncStorage.setItem('user', JSON.stringify(user));
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
            await AsyncStorage.removeItem('user');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
