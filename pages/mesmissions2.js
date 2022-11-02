import Link from 'next/link';
import Image from 'next/image';
import { Popover, Button } from 'antd';
import styles from '../styles/Missions.module.css';
import GererMissions from '../components/MissionsGerer';

function MissionsPage() {
  return (
   
      <div className={styles.midleContainer}>
        <GererMissions />
      </div>
    
  );
}

export default MissionsPage;
