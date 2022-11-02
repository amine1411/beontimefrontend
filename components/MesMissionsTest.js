// Librairies
import React, { useState, useEffect } from "react";
import styles from "../styles/MesMissions.module.css";
// Component
import CardMission from "./CardMission";

function MesMissions() {
  // State
  const [MissionsData, setMissionsData] = useState([]);
  const [AllMissions, setAllMissions] = useState([]);

  // UseEffects
  useEffect(() => {
    fetch('http://localhost:3000/missions/all')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMissionsData(data.missions);
        setAllMissions(data.missions);
      });
  }, []);

  //Je filtre les missions en fonction de la valeur de mon input, si l'input est vide (!value), je lui donne la valeur
  //de mon state avec les missions au complet
  const filterMissions = (event) => {
    const value = event.target.value.toLowerCase();
    // console.log(value);
    const FilterM = MissionsData.filter(
      (data) =>
        data.type.toLowerCase().includes(value) ||
        data.entreprise.toLowerCase().includes(value) ||
        data.libelle.toLowerCase().includes(value)
      // console.log(data, "Ok"),
      // console.log(value.length)
    );

    if (!value) {
      setMissionsData(AllMissions);
    } else {
      setMissionsData(FilterM);
      // console.log(MissionsData);
    }
  };

  //Filtrer les missions par le type de mission
  // function filterMissionByType() {}
  //  const result = MissionsData.find(({ type }) => type === "TVA");
  //  console.log(result, "Bouh")

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
    color: 'darkblue',
    paddingLeft: '30px',
    paddingTop: '20px',
    fontSize: '20px',
  };

  // Map sur les missions
  const missions = MissionsData.map((mission, index) => {
    // Si la progression est différente de 100, alors on génère la carte, sinon elle est automatiquement retirée de l'écran
    if (mission.progression !== 100) {
      return (
        <CardMission
          key={index}
          libelle={mission.libelle}
          entreprise={mission.entreprise}
          progression={mission.progression}
          nbjour={datediff(DayDate, new Date(mission.echeance))}
        />
      );
    }
  });

  // JSX
  return (
    <div className='Ma journée'>
      <h1 style={h1Style}>
        <b>Mes Missions </b>
        <input
          className={styles.searchbar}
          onInput={filterMissions}
          placeholder=" Search Mission..."
        />
      </h1>
      <>{missions}</>
    </div>
  );
}

export default MesMissions;
