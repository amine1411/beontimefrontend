import styles from '../styles/Clients.module.css';
import ClientsGerer from '../components/ClientsGerer';

function ClientsPage() {
  return (
    <div className={styles.midleContainer}>
      <ClientsGerer />
    </div>
  );
}

export default ClientsPage;
