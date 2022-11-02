import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import styles from '../styles/MaJournee.module.css';
import Image from 'next/image';
import MesMissions from '../components/MesMissions';
import MaJournee from '../components/MaJournee';

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
