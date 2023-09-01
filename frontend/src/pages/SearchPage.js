import React, { useEffect } from 'react';
import Card from '../components/Card';
import { useLocation, useNavigate} from 'react-router-dom';
import Navigation from '../components/Navigation';

const SearchPage = (props) => {

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])
    const navigate = useNavigate();
  const location = useLocation();
  const dataRecu = location.state && location.state.data;
    return (
      <>
      <Navigation/>
        <div className="slc container">
          <div className="connexion">
            <button id="retour" type="button" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left"></i> <p>Retour</p>
            </button>
          </div>
          <div className="search-list">
            {dataRecu.map((element) => (
              <Card manga={element} key={element.mal_id}/>
              ))}
          </div>
        </div>
      </>
    );
};

export default SearchPage;