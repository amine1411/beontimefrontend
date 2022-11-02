// Librairies
import React, { useState, useEffect } from "react";
import styles from "../styles/MonDashboard.module.css";

// Component


function InputFilter(data) {

     // State
  const [MissionsData, setMissionsData] = useState([]);
   const[InputFilter, setInputFilter] = useState("");


    return (
<input
  type="text"
  className={styles.input}
  onChange={(e) => setInpitFilter(e.target.value)}
  value={username}
  placeholder="Recherche"
/>
    )
}


export default InputFilter;
