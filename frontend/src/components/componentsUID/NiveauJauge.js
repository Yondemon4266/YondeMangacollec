import React, { useEffect } from 'react';

const NiveauJauge = ({userInfo}) => {
        const modulo = ((userInfo && userInfo.level) % 1) * 100;
    return (
        <>
        <div className='niveau-jauge'>
            <div className="niveau-jauge-fill" style={{width:`${modulo}%`}}></div>  
        </div>
        </>
    );
};

export default NiveauJauge;