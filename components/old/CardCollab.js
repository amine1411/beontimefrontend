import React from "react";
import styles from '../styles/CardCollab.module.css';




function CardCollab (user) {
    return (
      <div className={styles.gestioncard}><div className={styles.card}>
        <div className={styles.cardtitle}>
        <div><img className = {styles.img} src="iconprofil.png"/></div>
        <div>{user.nom} {user.prenom}</div>
      </div>

        </div></div>  
    )
};

export default CardCollab;