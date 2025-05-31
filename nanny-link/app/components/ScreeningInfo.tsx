'use client';

import { useRouter } from 'next/navigation';
import styles from '../styles/ScreeningInfo.module.css';
import Image from 'next/image';

export default function ScreeningInfo() {
  const router = useRouter();

  const handleStartCheck = () => {
    router.push('/register');
  };

  return (
    <section className={styles.container}>
      <div className={styles.imageSection}>
        <Image src="/family.svg" alt="Background screening" width={300} height={300} />
      </div>

      <div className={styles.textSection}>
        <h2>Show families you&apos;re trustworthy with a complete screening</h2>
        <ul className={styles.checklist}>
          <li>Sex offender registry check</li>
          <li>Global watchlist screening</li>
          <li>National criminal database search</li>
          <li>Statewide criminal records</li>
          <li>County-level criminal history</li>
        </ul>
        <button className={styles.ctaButton} onClick={handleStartCheck}>
          Start My Background Check
        </button>
      </div>
    </section>
  );
}
