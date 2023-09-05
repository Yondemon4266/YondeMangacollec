import React from 'react';
import { useNavigate } from 'react-router-dom';

const CollectionUIDUserVide = () => {
  const navigate = useNavigate();
    return (
        <div className="collection-vide">
            <div className="collection-vide-container">
              <h3>Votre collection est vide</h3>
              <p>
                Pour profiter du potentiel de Yonde Mangacollec, ajoutez des
                mangas à votre collection.
              </p>
              <div className="btn-optn-card-page center">
                <div className="add-remove" style={{width:"80%"}}>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => navigate("/recherche")}
                  >
                    <i className="fa-solid fa-plus"></i>
                    <p>Ajouter des mangas</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
    );
};

export default CollectionUIDUserVide;