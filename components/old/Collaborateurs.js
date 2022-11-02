import Link from "next/link";
import Image from "next/image";
import { Popover, Button } from "antd";
import styles from "../styles/Collaborateurs.module.css";
import MesCollabs from "./MesCollabs";

function Collaborateurs() {
  return (
    <div className={styles.container}>

      {/*LeftSection begins */}

      <div className={styles.leftSection}>
        <div>
          <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/owl.png"
              alt="Logo"
              width={100}
              height={100}
              className={styles.logo}
            />
          </Link>
          </div>
          <div className={styles.navigateContainer}>
            <Link href="/home">
              <button className={styles.navigationButton}>
                <p className={styles.navigation}>Ma journée</p>
              </button>
            </Link>
            <Link href="/dashboard">
              <button className={styles.navigationButton}>
                <p className={styles.navigation}>Tableau de bord</p>
              </button>
            </Link>
            <Link href="/clients">
              <button className={styles.navigationButton}>
                <p className={styles.navigation}>Mes clients</p>
              </button>
            </Link>
            <Link href='/missions'>
              <button className={styles.navigationButton}>
                <p className={styles.navigation}>Mes Missions</p>
              </button>
            </Link>
            <Link href='/collaborateurs'>
              <button className={styles.navigationButtonStatic}>
                <p className={styles.navigation}>Mes Collaborateurs</p>
              </button>
            </Link>
            <div className={styles.popoverContent}>
              <Popover
                title="Mon compte"
                content={"Logout"}
                className={styles.popoverBtn}
                trigger="hover"
              >
                <Button className={styles.navigation}>Logout</Button>
              </Popover>
            </div>
          </div>
        </div>
      </div>

       {/*LeftSection ends */}
        {/*MidleSection begins */}
      <div className={styles.midleContainer}>
        <MesCollabs/>
      </div>
      {/*MidleSection ends */}
      {/*RightSection begins */}
      <div className={styles.rightSection}>
        <div> Rappels</div>
        <input type="text" placeholder="Ajouter un rappel" id="addReminder" className={styles.inputReminder}/>
      </div>
      {/*RightSection ends */}
    </div>
  );
}

export default Collaborateurs;
