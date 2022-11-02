// Librairies
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@chakra-ui/react';
// Component
import CardMission from '../components/CardMission';

function MesMissions(props) {
  //redux
  const user = useSelector((state) => state.user.value);
  // console.log(user.username, "USERS");
  const missionReduce = useSelector((state) => state.mission);
  // State
  const [DisplayedData, setDisplayedData] = useState([]);
  const [AllMissions, setAllMissions] = useState([]);
  console.log(DisplayedData, 'DISPLAYED');

  // UseEffects
  useEffect(() => {
    //Anciennement 'http://localhost:3000/missions/all' si on veut récupérer toutes les missions (pour les filtrer ensuite)
    fetch(`http://localhost:3000/missions/collab/${user.username}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setDisplayedData(data.missions);
        setAllMissions(data.missions);
        const createdMissions = { ...data.missions };
      });
  }, []);

  //Je filtre les missions en fonction de la valeur de mon input, si l'input est vide (!value), je lui donne la valeur
  //de mon state avec les missions au complet
  const filterMissions = (event) => {
    const value = event.target.value.toLowerCase();
    // console.log(value);
    const FilterM = AllMissions.filter(
      (data) =>
        data.type.toLowerCase().includes(value) ||
        data.entreprise.toLowerCase().includes(value) ||
        data.libelle.toLowerCase().includes(value)

      // console.log(data, "Ok"),
      // console.log(value.length)
    );
    console.log(DisplayedData, 'DisplayedData');
    if (!value) {
      setDisplayedData(AllMissions);
    } else {
      setDisplayedData(FilterM);
    }
  };

  //Fonction pour récupérer l'échéance en jour, en fonction de la date du jour (DayDate) et la date d'échéance dans la BDD.

  const DayDate = new Date();

  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  //Trie des missions en fonction de l'échéance
  if (user.token) {
    DisplayedData.sort(function compare(a, b) {
      if (a.echeance < b.echeance) return -1;
      if (a.echeance > b.echeance) return 1;
      return 0;
    });
  }
  // Variable CSS
  const h1Style = {
    color: 'darkblue',
    paddingLeft: '30px',
    paddingTop: '20px',
    fontSize: '30px',
  };
  // Map sur les missions
  const missions = DisplayedData.map((mission, index) => {
    // Si la progression est différente de 100, alors on génère la carte, sinon elle est automatiquement retirée de l'écran
    if (mission.progression !== 100) {
      return (
        <CardMission
          key={index}
          idMission={mission.idMission}
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
        <Input
          size='md'
          mt='4vh'
          mb='4vh'
          variant='filled'
          onInput={filterMissions}
          placeholder=' 🔍 Rechercher une mission...'
        />
      </h1>
      <div>{missions}</div>
    </div>
  );
}

export default MesMissions;
