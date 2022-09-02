import React from 'react';

const ShareUser = ({user,addOrRemoveUser,alreadySelected}) => {
    return (
        <div className={`flex flex-col justify-center items-center shadow-lg p-4 space-y-2 cursor-pointer ${(alreadySelected()) && 'border-2 border-primary'} `} onClick={addOrRemoveUser}>
            <h1 className='text-sm text-white bg-primary p-3 rounded-full'>{user?.displayName.split(' ')[0]}</h1>
            <h1 className='text-xl text-primary'>{user?.displayName}</h1>
        </div>
    );
};

export default ShareUser;