// Used for Next.js
import { useCallback, useState, useEffect } from 'react';

import styles from './app.module.css';

const Index = () => {
  const [planets, setPlanets] = useState([]);

  const fetchMyAPI = useCallback(async () => {
    let response = await fetch('http://localhost:5000/planets');
    response = await response.json();
    console.log('API response', response);
    setPlanets(response);
  }, []);

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  return (
    <div className={styles.app}>
      <section className={styles['app-header']}>
        <h1>NASA Project</h1>
        <p>Planets: {planets}</p>
      </section>
    </div>
  );
};

export default Index;
