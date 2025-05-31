'use client';

import { useRouter } from 'next/navigation';
import styles from '../styles/FinalCTA.module.css';
import Image from 'next/image';

export default function FinalCTA() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/register'); // change to your target route
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <h2>
          Stand out as a trusted nanny<br />with a verified background check
        </h2>
        <button className={styles.ctaButton} onClick={handleClick}>
          Start My Background Check
        </button>
      </div>

      <div className={styles.leftDecor}>
        <Image src="/housestoons.svg" alt="Decorative houses left" fill className={styles.image} />
      </div>
      <div className={styles.rightDecor}>
        <Image src="/housetoon.svg" alt="Decorative houses right" fill className={styles.image} />
      </div>
    </section>
  );
}
