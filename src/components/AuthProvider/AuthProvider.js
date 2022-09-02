import React, { createContext } from 'react';
import useFirebase from '../../hooks/useFirebase';

export const context=createContext('');

const AuthProvider = ({children}) => {
    const value=useFirebase();
    return (
        <context.Provider value={value}>
            {children}
        </context.Provider>
    );
};

export default AuthProvider;