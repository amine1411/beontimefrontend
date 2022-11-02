// Librairies
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Component
import CardMissionDaily from '../components/CardMissionDaily';

function MaJournee() {
  // Redux
  const dispatch = useDispatch();
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
        const createdMissions = { ...data.missions };
        // console.log(createdMissions, "Created");
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

  // Map sur les missions
  let missions = [];
  if (missions) {
    // console.log(mission.echeance);
    missions = missionReduce.map((mission, index) => {
      // console.log(missionReduce[index].libelle, "OKOK");

      // if (mission.find((data) => data === entreprise)) {
      return (
        <CardMissionDaily
          onClick={() => dispatch(removeMission(missions))}
          key={index}
          idMission={mission.idMission}
          libelle={mission.libelle}
          entreprise={mission.entreprise}
          progression={mission.progression}
          nbjour={mission.nbjour}
        />
      );
      //  }
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
