// src/app/admin/page.js
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { addOption } from '../utils/api'; // Update the path
import styles from './admin.module.css';

export default function AdminPage() {
  const [optionText, setOptionText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addOption(optionText).then(() => {
      setSuccessMessage('Option added successfully!');
      setOptionText('');
    });
  };

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.adminTitle}>Admin Page</h1>
      <div className={styles.navigationButton}>
        <Link href="/">
          <button>Go to Home Page</button>
        </Link>
      </div>
      <form className={styles.adminForm} onSubmit={handleSubmit}>
        <input
          type="text"
          value={optionText}
          onChange={(e) => setOptionText(e.target.value)}
          placeholder="Enter new option"
          required
        />
        <button type="submit">Add Option</button>
      </form>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
    </div>
  );
}