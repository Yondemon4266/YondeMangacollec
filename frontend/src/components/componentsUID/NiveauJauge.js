import React from 'react';
import { useSelector } from 'react-redux';

const NiveauJauge = ({userInfo}) => {

    const levelMessage = useSelector(state => state.userReducer.levelMessage);
    const modulo = ((userInfo && userInfo.level) % 1) * 100;

    const isLevelUp = (levelMessage && levelMessage) === 'Niveau augmenté !';
    console.log(isLevelUp);

    return (
        <>
        <div className='niveau-jauge'>
            <div className="niveau-jauge-fill" style={{width:`${modulo}%`}}></div>
        </div>
        </>
    );
};

export default NiveauJauge;