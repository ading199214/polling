// src/app/result/page.js
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getResults } from '../utils/api';
import styles from './results.module.css';

export default function ResultsPage() {
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    getResults().then(response => setPoll(response.data));
  }, []);

  if (!poll) return <div>Loading...</div>;

  const sortedOptions = [...poll.options].sort((a, b) => b.points - a.points);
  const highestPoints = sortedOptions[0]?.points || 0;
  const winners = sortedOptions.filter(option => option.points === highestPoints);

  const winnerText =
    winners.length > 1
      ? `It's a tie between: ${winners.map(w => w.text).join(', ')} with ${highestPoints} points each!`
      : `The winner is: ${winners[0].text} with ${highestPoints} points!`;

  return (
    <div className={styles.resultsContainer}>
      <h1 className={styles.resultsTitle}>Poll Results</h1>
      <div className={styles.navigationButton}>
        <Link href="/">
          <button>Go to Home Page</button>
        </Link>
      </div>
      <table className={styles.resultsTable}>
        <thead>
          <tr>
            <th>Option</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedOptions.map((option, index) => (
            <tr key={index}>
              <td>{option.text}</td>
              <td>{option.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className={styles.winnerAnnouncement}>{winnerText}</h2>
    </div>
  );
}