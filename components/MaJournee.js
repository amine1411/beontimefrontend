// Librairies
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Component
import CardMissionDaily from '../components/CardMissionDaily';

function MaJournee() {
  // Redux
  //Je vais chercher le state de mon reducer mission pour utiliser mes objets cartes, je les stocke dans missionReduce
  const missionReduce = useSelector((state) => state.mission.value);
  console.log(missionReduce, 'REDUCER MISSIONS');
  //  console.log(missionReduce, "reducer")

  // State
  const [MissionsData, setMissionsData] = useState([]);

  // UseEffects
  useEffect(() => {
    fetch('http://localhost:3000/missions/all')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setMissionsData(data.missions);
      });
  }, []);

  //Trie des missions en fonction de l'échéance

  MissionsData.sort(function compare(a, b) {
    if (a.echeance < b.echeance) return -1;
    if (a.echeance > b.echeance) return 1;
    return 0;
  });

  // Variable CSS
  const h1Style = {
    marginBottom: '12vh',
    color: 'darkblue',
    paddingLeft: '30px',
    paddingTop: '20px',
    fontSize: '30px',
  };

  // Map sur les missions dans le reducer
  let missions = [];
  if (missions) {
    // console.log(mission.echeance);
    missions = missionReduce.map((mission, index) => {
      // console.log(missionReduce[index].libelle, "OKOK");

      return (
        <CardMissionDaily
          key={index}
          idMission={mission.idMission}
          libelle={mission.libelle}
          entreprise={mission.entreprise}
          progression={mission.progression}
          nbjour={mission.nbjour}
        />
      );
    });
  }

  // JSX
  return (
    <div className='Ma journée'>
      <h1 style={h1Style}>
        <b>Ma journée </b>
      </h1>
      <div>{missions}</div>
    </div>
  );
}

export default MaJournee;
