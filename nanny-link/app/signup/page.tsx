'use client';

import { useState } from 'react';
import styles from './signup.module.css';
import { sendTelegramMessage } from '@/utils/telegram';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    email: '',
    password: '',
  });

  const isComplete = Object.values(formData).every((val) => val.trim() !== '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = `📝 New Signup Submission:
First Name: ${formData.first}
Last Name: ${formData.last}
Email: ${formData.email}`;
    await sendTelegramMessage(message);
    alert('Form submitted!');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Welcome!</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            First Name
            <input
              type="text"
              name="first"
              className={styles.input}
              value={formData.first}
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            Last Name
            <input
              type="text"
              name="last"
              className={styles.input}
              value={formData.last}
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            Email
            <input
              type="email"
              name="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            Password
            <input
              type="password"
              name="password"
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <p className={styles.loginText}>
            Already have an account?{' '}
            <a href="#" className={styles.link}>Login</a>
          </p>

          <p className={styles.terms}>
            By proceeding you agree to the{' '}
            <a href="#" className={styles.link}>Terms of Service</a> &{' '}
            <a href="#" className={styles.link}>Privacy Policy</a>
          </p>

          <button
            type="submit"
            className={isComplete ? styles.enabledButton : styles.disabledButton}
            disabled={!isComplete}
          >
            NEXT
          </button>
        </form>
      </div>
    </div>
  );
}
