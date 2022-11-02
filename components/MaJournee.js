// Librairies
import React, { useState, useEffect } from 'react';
import styles from '../styles/MesMissions.module.css';
import { useDispatch, useSelector } from 'react-redux';

// Component
import CardMissionDaily from '../components/CardMissionDaily';
import {
  addMissionToJourney,
  loadMissionsJourney,
} from '../reducers/mission';

function MaJournee(mission) {
  // Redux
  const dispatch = useDispatch();
  const missionReduce = useSelector((state) => state.mission.value);
  console.log(missionReduce, 'REDUCER MISSIONS');
  //  console.log(missionReduce, "reducer")

  // State

  const [MissionsData, setMissionsData] = useState([]);
  const [DailyMissions, setDailyMissions] = useState([]);
  // console.log(DailyMissions, "Daylymissions");
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

  //Fonction pour récupérer l'échéance en jour, en fonction de la date du jour (DayDate) et la date d'échéance dans la BDD.

  const DayDate = new Date();

  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

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

  //   function removeDuplicates(originalArray, prop) {
  //     var newArray = [];
  //     var lookupObject = {};

  //     for (var i in originalArray) {
  //       lookupObject[originalArray[i][prop]] = originalArray[i];
  //     }

  //     for (i in lookupObject) {
  //       newArray.push(lookupObject[i]);
  //     }
  //     return newArray;
  //   }

  //   var uniqueArray = removeDuplicates(missionReduce, "licenseNum");
  //   console.log("uniqueArray is: " + JSON.stringify(uniqueArray));

  // const missionsNotDuplicate = removeDuplicates(missions, "libelle")
  // console.log(missionsNotDuplicate, "NOT DUPLICATE")

  let missions = [];
  // Map sur les missions
  if (missions) {
    // console.log(mission.echeance);
    missions = missionReduce.map((mission, index) => {
      // console.log(missionReduce[index].libelle, "OKOK");

      // if (mission.find((data) => data === entreprise)) {
      return (
        <CardMissionDaily
          onClick={() => dispatch(removeMission(missions))}
          key={index}
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
