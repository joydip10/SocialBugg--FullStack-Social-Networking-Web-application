import React from 'react';
import Header from '../Header/Header';

const Defaultlayout = (props) => {
    return (
        <div className='mx-20 my-5 md:mx-5'>
            <Header/>
            <div className="mt-5 border-2 rounded-md p-5">
                {props.children}
            </div>
        </div>
    );
};

export default Defaultlayout;