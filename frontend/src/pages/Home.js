import React from 'react';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Nouveautes from '../components/Nouveautes';

const Home = () => {

    return (
        <>
        <div className='home'>
            <Navigation/>
            <div className="home-container container">
            <Header/>
            <Nouveautes />
            </div>
        </div>
        </>
    );
};

export default Home;