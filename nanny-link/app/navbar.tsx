'use client';

import { useState } from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Image src="/nanny.svg" alt="Nanny Link Logo" width={120} height={40} />
      </div>
      <nav className={`${styles.navLinks} ${menuOpen ? styles.show : ''}`}>
        <a href="#">Home</a>
        <a href="#">Services</a>
        <a href="#">Login</a>
      </nav>
      <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
    </header>
  );
}
