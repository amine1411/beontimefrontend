import React from "react";
import { useState, useEffect } from "react";
import styles from '../styles/MesCollabs.module.css';
import CardCollab from "../components/CardCollab";
import { Input } from '@chakra-ui/react';

function MesCollabs() {

  const [AllUsers, setAllUsers] = useState([]);  
  const [Users, setUsers] = useState([]);

  // UseEffects
  useEffect(() => {
    fetch('http://localhost:3000/users/all')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAllUsers(data.users);
        setUsers(data.users);
      });
  }, []);

 const card = Users.map((user, index) => (
    <CardCollab
      key={index}
      nom={user.nom}
      prenom={user.prenom}
    />
  )); 


   const filterCards = event => {
      const value = event.target.value.toLowerCase();
      const filteredUsers = Users.filter(user => (user.nom.toLowerCase().includes(value)));
      setUsers(filteredUsers);
    }

    
  
    return (
      <div className={styles.bigcard}>
        <h1 className={styles.titre} onInput={filterCards}>
          Mes Collaborateurs{' '}
        </h1>
        <Input
          size='md'
          mt='2vh'
          mb='2vh'
          variant='filled'
          placeholder=' 🔍 Rechercher un collaborateur...'
        />
        <button className={styles.add}>
          Ajouter un Collaborateur
        </button>
        <div className={styles.cardscontainer}>{card}</div>
      </div>
    );
    
    }
    export default MesCollabs; 