'use client';
import Image from 'next/image';
import styles from './page.module.css';
import Navbar from './navbar';
import HowItWorks from './components/HowItWorks';
import ScreeningInfo from './components/ScreeningInfo';
import FinalCTA from './components/FinalCTA';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleStartCheck = () => {
    router.push('/register'); // Make sure /personalinfo exists
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.hero}>
        <div className={styles.textContent}>
          <h1>Get Started with Your Nanny Background Check</h1>
          <p>
            Families want peace of mind — and you deserve to show them you&apos;re trustworthy and qualified.
            Begin your background check to build confidence with employers.
          </p>
          <h2>Start your verification today</h2>
          <button className={styles.ctaButton} onClick={handleStartCheck}>
            Begin Background Check
          </button>
          <p>
            Already have an account? <a href="#">Login</a>
          </p>
        </div>

        <div className={styles.imageContainer}>
          <Image
            src="/boyimage.webp"
            alt="Happy child illustration"
            width={300}
            height={300}
            className={styles.heroImage}
            priority
          />
        </div>
      </main>

      <HowItWorks />
      <ScreeningInfo />
      <FinalCTA />
    </div>
  );
}
