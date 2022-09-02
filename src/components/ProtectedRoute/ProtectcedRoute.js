import React from 'react';
import { useLocation,Navigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import useFirebase from '../../hooks/useFirebase';

const ProtectedRoute = ({ children, ...rest }) => {
    let { user, isLoading } = useFirebase();
    const location=useLocation();
    
    if(isLoading === true){
        return <Spinner/>
    }
    else{
        if (user?.email) {
            return children;            
        }
        else{
            return <Navigate to="/login" state={{ from: location }} />;
        }
    }
                
};

export default ProtectedRoute;