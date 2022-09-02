import { useContext } from 'react';
import { context } from '../components/AuthProvider/AuthProvider';

const useAuth = () => {
    return useContext(context);
};

export default useAuth;