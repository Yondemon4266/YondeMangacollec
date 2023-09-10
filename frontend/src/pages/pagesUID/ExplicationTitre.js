import React from "react";

const ExplicationTitre = ({setExplicationVisible}) => {
  return (
    <div className="explication-titres">
      <h4><i className="fa-solid fa-angle-down" onClick={() => setExplicationVisible(false)}></i>Explication des titres</h4>
      <table className="explication-titres-container">
        <thead>
          <tr>
            <th>Titres</th>
            <th>Rangs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Genin</td>
            <td>Niveau 0 à 5</td>
          </tr>
          <tr>
            <td>Chûnin</td>
            <td>Niveau 5 à 10</td>
          </tr>
          <tr>
            <td>Jônin</td>
            <td>Niveau 10 à 30</td>
          </tr>
          <tr>
            <td>Sennin</td>
            <td>Niveau 30 à 40</td>
          </tr>
          <tr>
            <td>Kage</td>
            <td>Niveau 40 à ∞</td>
          </tr>
        </tbody>
      </table>
      <div className="sous-explication"><p>Les villages sont attribués aléatoirement à la création du compte. 
      </p>
      <p>"Feuille", "Sable", "Roche", "Brume", "Pluie", "Son"</p></div>
    </div>
  );
};

export default ExplicationTitre;
