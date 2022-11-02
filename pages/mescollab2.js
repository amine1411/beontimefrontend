import Link from 'next/link';
import Image from 'next/image';
import { Popover, Button } from 'antd';
import styles from '../styles/Collaborateurs.module.css';
import CollaborateursGerer from '../components/CollaborateursGerer';

function CollabPage() {
  return (
    <div className={styles.midleContainer}>
      <CollaborateursGerer />
    </div>
  );
}

export default CollabPage;
