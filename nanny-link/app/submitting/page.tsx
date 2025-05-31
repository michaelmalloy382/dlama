'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import styles from './submitting.module.css';

export default function SubmittingPage() {
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [confirmationCode, setConfirmationCode] = useState('');
  const router = useRouter();

  useEffect(() => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setConfirmationCode(code);

    const timer = setTimeout(() => {
      setIsSubmitting(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Submitting Your Information...</title>
        <meta name="description" content="We are processing your information, please wait..." />
      </Head>

      <div className={styles.page}>
        <div className={styles.card}>
          {isSubmitting ? (
            <>
              <h1 className={styles.heading}>Submitting...</h1>
              <p className={styles.text}>
                We are processing your information. Please wait...
              </p>
              <div className={styles.loaderContainer}>
                <div className={styles.loader}></div>
              </div>
            </>
          ) : (
            <>
              <h1 className={styles.heading}>Application Submitted 🛠️</h1>
              <p className={styles.text}>
                Your application has been received.
                <br />
                This is your confirmation code: <strong className={styles.code}>{confirmationCode}</strong>.
                <br />
                Please message any prospective parent handling your application with this code to proceed with the next steps
              </p>
              <button className={styles.button} onClick={() => router.push('/')}>
                Go to Home Page
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
