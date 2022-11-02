// With NavBar
import Navbar from './Navbar';
import ReminderTask from './ReminderTask';
import styles from '../styles/Layout.module.css';
import { Flex, Text, IconButton } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <div className={styles.grid}>
      <Flex>
        <Navbar />
      </Flex>
      <div className={styles.center}>{children}</div>
      <div className={styles.reminder}>
        <ReminderTask />
      </div>
    </div>
  );
};

export default Layout;
