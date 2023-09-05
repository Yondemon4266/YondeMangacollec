import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CollectionUIDFriendVide = () => {
    const navigate = useNavigate();
    const { user } = useParams();
    return (
        <div className="collection-vide">
            <div className="collection-vide-container">
              <h3>La collection de {user} est vide</h3>
            </div>
          </div>
    );
};

export default CollectionUIDFriendVide;