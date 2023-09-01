import React from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../../components/Navigation';

const CollectionUID = () => {
    const userInfo = useSelector((state) => state.userReducer.userInfo);
    return (
        <>
        <Navigation />
        <div className='container'>
            <h1>COLLECTION CONNECTE</h1>
            <h2>{userInfo && userInfo.pseudo}</h2>
        </div>
        </>
    );
};

export default CollectionUID;