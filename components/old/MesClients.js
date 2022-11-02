import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../styles/MesClients.module.css';
import CardClient from './CardClient';
import { Input } from '@chakra-ui/react';

function MesClients() {
  const [allClients, setAllClients] = useState([]);
  const [Clients, setClients] = useState([]);
  // UseEffects
  useEffect(() => {
    fetch('http://localhost:3000/clients/all')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAllClients(data.clients);
        setClients(data.clients);
      });
  }, []);

  const card = Clients.map((client, index) => (
    <CardClient key={index} entreprise={client.entreprise} />
  ));

  const filterCards = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredClients = Clients.filter((client) =>
      client.entreprise.toLowerCase().includes(value)
    );
    setClients(filteredClients);
  };

  return (
    <div className={styles.bigcard}>
      <h1 className={styles.titre}>Mes Clients </h1>
      <Input
        size='md'
        mt='2vh'
        mb='2vh'
        variant='filled'
        onInput={filterCards}
        placeholder=' 🔍 Rechercher un client...'
      />
      <button className={styles.add} placeholder='Ajouter un client'>
        Ajouter un client
      </button>
      <div className={styles.cardscontainer}>{card}</div>
    </div>
  );
}
export default MesClients;
