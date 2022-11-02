// Librairies
import React, { useState, useEffect } from 'react';
import styles from '../styles/MonDashboard.module.css';
import { Input, Flex, Center, Heading } from '@chakra-ui/react';

// Component
import CardMissionDashboard from '../components/CardMissionDashboard';

function MonDashBoard(data) {
  // State
  const [DisplayedData, setDisplayedData] = useState([]);
  const [DisplayAdaptMissions, setDisplayAdaptMissions] = useState(
    []
  );
  const [AllMissions, setAllMissions] = useState([]);

  // UseEffects
  useEffect(() => {
    fetch('http://localhost:3000/missions/all')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setDisplayedData(data.missions);
        setAllMissions(data.missions);
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
        data.libelle.toLowerCase().includes(value) ||
        data.idCollab.toLowerCase().includes(value)
      // console.log(data, "Ok"),
      // console.log(value.length)
    );

    console.log(DisplayedData, 'DisplayedData');
    if (!value) {
      setDisplayedData(AllMissions);
    } else {
      setDisplayedData(FilterM);
      // console.log(DisplayedData);
    }
  };

  //Trie des missions en fonction de l'échéance

  DisplayAdaptMissions.sort(function compare(a, b) {
    if (a.echeance < b.echeance) return -1;
    if (a.echeance > b.echeance) return 1;
    return 0;
  });

  //Filtrer les missions non débutées

  const filterFreeMissions = DisplayedData.filter(
    (data) => data.progression === 0
  );
  // console.log(filterFreeMissions, "finishmission");

  //Filtrer les missions terminées

  const filterFinishMissions = DisplayedData.filter(
    (data) => data.progression === 100
  );
  // console.log(filterFinishMissions, "finishmission");

  //Filtrer les missions en cours

  const filterInProgressMissions = DisplayedData.filter(
    (data) => (data.progression >= 10) & (data.progression <= 90)
  );
  // console.log(filterInProgressMissions, "inprogressmission");

  //Filtrer les missions en retard

  const filterLateMissions = DisplayedData.filter(
    (data) => new Date() > new Date(data.echeance)
  );
  // console.log(filterLateMissions, "latemission");

  //Fonction difference entre 2 dates en jour (differences en milliseconds,
  //puis on Math.round pour matcher avec le jour le plus proche)

  const DayDate = new Date();

  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  // const DateEcheance = new Date(DisplayedData.echeance);
  // console.log(DayDate);
  // const RandomDate = new Date("2022-10-24");
  // // console.log(RandomDate);
  // const CompareDates = datediff(DayDate, RandomDate);
  // console.log(datediff(DayDate, RandomDate)); //resultat = 2

  // Si une échéance est en retard (>0), change la couleur en rouge. Si rien n'est en retard, couleur par défaut.
  const changeColor = [];
  const changeColorEntitled = [];
  const changeColorCard = [];
  if (filterLateMissions.length > 0) {
    changeColorCard.push(styles.card2);
    changeColor.push(styles.changeColorAlert);
    changeColorEntitled.push(styles.changeColorAlert2);
  } else {
    changeColorEntitled.push(styles.entitled);
    changeColorCard.push(styles.card);
  }

  const handleClickFreeMissions = () => {
    setDisplayAdaptMissions(filterFreeMissions);
    console.log(DisplayAdaptMissions);
    // for (let i = 0; i < filterFreeMissions.length; i++) {console.log(DisplayAdaptMissions[i].libelle);}
  };

  const handleCLickLateMissions = () => {
    setDisplayAdaptMissions(filterLateMissions);
    console.log(DisplayAdaptMissions);
  };

  const handleCLickFinishMissions = () => {
    setDisplayAdaptMissions(filterFinishMissions);
    console.log(DisplayAdaptMissions);
  };

  const handleCLickInProgressMissions = () => {
    setDisplayAdaptMissions(filterInProgressMissions);
    console.log(DisplayAdaptMissions);
  };

  const handleFilterInput = () => {
    setDisplayedData(DisplayedData);
    console.log(DisplayedData);
  };

  // Map sur les missions adaptées
  const adaptMissions = DisplayAdaptMissions.map((mission, index) => {
    return (
      <CardMissionDashboard
        key={index}
        libelle={mission.libelle}
        entreprise={mission.entreprise}
        progression={mission.progression}
        idCollab={mission.idCollab}
        nbjour={datediff(DayDate, new Date(mission.echeance))}
      />
    );
  });

  // JSX
  return (
    <Flex min-height='100vh' min-width='100vw'>
      <div className='Ma journée'>
        <div>
          <Flex flexDirection='column' ml='10vh' mr='10vh' pt='4vh'>
            <Heading>
              <h1 className={styles.titre}>
                <b>Hello ✌</b>
              </h1>
            </Heading>
            <Center>
              <Input
                size='md'
                mt='5vh'
                variant='filled'
                onInput={filterMissions}
                placeholder=' 🔍 Rechercher une mission...'
              />
            </Center>
          </Flex>
          <Flex ml='6vh' mr='6vh' justifyContent='center'>
            <Center>
              <div className={styles.objectivesContainer}>
                <div
                  className={changeColorCard}
                  onClick={(e) => handleCLickLateMissions(e)}
                >
                  <div className={styles.objectives}>
                    <div className={changeColor}>
                      {filterLateMissions.length}
                      <p className={changeColorEntitled}>
                        <b>En retard</b>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={styles.card}
                  onClick={(e) => handleCLickInProgressMissions(e)}
                >
                  <div className={styles.objectives}>
                    {filterInProgressMissions.length}
                    <p className={styles.entitled}>
                      <b>En cours</b>
                    </p>
                  </div>
                </div>
                <div
                  className={styles.card}
                  onClick={(e) => handleCLickFinishMissions(e)}
                >
                  <div className={styles.objectives}>
                    {filterFinishMissions.length}
                    <p className={styles.entitled}>
                      <b>Terminées</b>
                    </p>
                  </div>
                </div>
                <div
                  className={styles.card}
                  onClick={(e) => handleClickFreeMissions(e)}
                >
                  <div className={styles.objectives}>
                    {filterFreeMissions.length}
                    <p className={styles.entitled}>
                      <b>Non débutées</b>
                    </p>
                  </div>
                </div>
              </div>
            </Center>
          </Flex>
        </div>
        <Flex justifyContent='center'>
          <div className={styles.filterMissionsContainer}>
            <div className={styles.cardsMission}>{adaptMissions}</div>
          </div>
        </Flex>
      </div>
    </Flex>
  );
}

export default MonDashBoard;