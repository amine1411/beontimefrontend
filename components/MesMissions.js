// Librairies
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Input, HStack, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
// Component
import CardMission from "./CardMission";

function MesMissions() {
  //redux
  const user = useSelector((state) => state.user.value);
  // console.log(user.username, "USERS");

  // State
  const [DisplayedData, setDisplayedData] = useState([]);
  const [AllMissions, setAllMissions] = useState([]);
  // console.log(DisplayedData, 'DISPLAYED');

  // UseEffects
  useEffect(() => {
    //Permet de fetch pour ensuite afficher les missions uniquement en ciblant le username du collaborateur (par exemple C02 si on est connecté sur la session)
    fetch(`http://localhost:3000/missions/collab/${user.username}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setDisplayedData(data.missions);
        setAllMissions(data.missions);
        //const createdMissions = { ...data.missions };
      });
  }, [DisplayedData]);

  //Je prend la valeur de mon input
  const filterMissions = (event) => {
    const value = event.target.value.toLowerCase();
    // console.log(value);

    //Je filtre en fonction du type ou de l'entreprise ou du libellé
    const FilterM = AllMissions.filter(
      (data) =>
        data.type.toLowerCase().includes(value) ||
        data.entreprise.toLowerCase().includes(value) ||
        data.libelle.toLowerCase().includes(value)

      // console.log(data, "Ok"),
      // console.log(value.length)
    );
    //console.log(DisplayedData, "DisplayedData");
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
    color: "darkblue",
    paddingLeft: "30px",
    paddingTop: "20px",
    fontSize: "30px",
  };
  // Map sur les missions
  //console.log("DisplayedDate =>", DisplayedData);

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
          tempsRealise={mission.tempsRealise}
          nbjour={datediff(DayDate, new Date(mission.echeance))}
        />
      );
    }
  });

  // JSX
  return (
    <div className="Ma journée">
      <h1 style={h1Style}>
        <b>Mes Missions </b>
        {/* Selection de la Mission -------------------------------------------
        <HStack spacing="12px">
          <IconButton
            aria-label="Search database"
            shadow="md"
            icon={<SearchIcon />}
          />
          <Input
            size="md"
            mt="4vh"
            mb="4vh"
            variant="filled"
            onInput={filterMissions}
            placeholder="Rechercher une mission..."
          />
        </HStack>

        Selection de la Mission ---------------------------------------- */}
      </h1>
      <div>{missions}</div>
    </div>
  );
}

export default MesMissions;
