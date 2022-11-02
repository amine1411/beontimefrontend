import React from "react";
import styles from '../styles/CardClient.module.css';




function CardClient (client) {
    return (
      <div className={styles.gestioncard}><div className={styles.card}>
        <div className={styles.cardtitle}>
        <div><img className = {styles.img} src="iconprofil.png"/></div>
        <div>{client.entreprise}</div>
      </div>

        </div></div>  
    )
};

export default CardClient;