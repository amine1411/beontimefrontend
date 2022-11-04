import styles from "../styles/MaJournee.module.css";
import MesMissions from "../components/MesMissions";
import MaJournee from "../components/MaJournee";

function Majournee() {
  return (
    <div className={styles.container}>
      <div className={styles.midleLeft}>
        <MesMissions />
      </div>
      <div className={styles.midleRight}>
        <MaJournee />
      </div>
    </div>
  );
}

export default Majournee;
