import React from 'react';

const Popularity = ({ manga}) => {
        const maxValue = manga.airing ? 23986 : 53117;
        const currentValue = manga.rank ? manga.rank : manga.popularity;
        const fillPercentage = (currentValue / maxValue) * 100;
        const widthValue = (100 - fillPercentage);
    return (
        <div className='popularity-jauge'>
            <div className="fill-jauge" style={{width: `${widthValue.toFixed(5)}%`}}></div>
        </div>
    );
};

export default Popularity;