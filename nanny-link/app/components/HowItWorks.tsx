'use client';

import { useRouter } from 'next/navigation';
import styles from '../styles/HowItWorks.module.css';
import Image from 'next/image';

export default function HowItWorks() {
  const router = useRouter();

  const handleStartCheck = () => {
    router.push('/register');
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>
        How to complete your background check as a nanny
      </h2>

      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.iconWrapper}>
            <Image src="/firstst.svg" alt="Start check" fill className={styles.image} />
          </div>
          <h3>Create your profile</h3>
          <p>Click the button to begin. We&apos;ll walk you through setting up your background check.</p>
        </div>

        <div className={styles.step}>
          <div className={styles.iconWrapper}>
            <Image src="/nannyprovidecon.svg" alt="Submit details" fill className={styles.image} />
          </div>
          <h3>Submit your information</h3>
          <p>Provide identity details and relevant history for verification.</p>
        </div>

        <div className={styles.step}>
          <div className={styles.iconWrapper}>
            <Image src="/getresulticon.svg" alt="Get verified" fill className={styles.image} />
          </div>
          <h3>Get verified & boost your trust</h3>
          <p>Once verified, you can show families you&apos;re background-checked and ready to work.</p>
        </div>
      </div>

      <button className={styles.ctaButton} onClick={handleStartCheck}>
        Start My Background Check
      </button>
    </section>
  );
}
