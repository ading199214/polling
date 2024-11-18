"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPoll, submitVote } from './utils/api';
import styles from './page.module.css';

export default function HomePage() {
  const [poll, setPoll] = useState(null);
  const [votes, setVotes] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const hasVoted = localStorage.getItem('hasVoted');
    // if (hasVoted) {
    //   setSubmitted(true);
    // }
    getPoll().then(response => setPoll(response.data));
  }, []);

  const handleVoteChange = (optionText, voteValue) => {
    setVotes(prevVotes => {
      const otherVotes = prevVotes.filter(v => v.optionText !== optionText);
      return [...otherVotes, { optionText, voteValue }];
    });
  };

  const handleSubmit = () => {
    if (votes.length === 0) {
      alert('Please vote on at least one option.');
      return;
    }
    submitVote(votes).then(() => {
      setSubmitted(true);
      localStorage.setItem('hasVoted', 'true');
    });
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>{poll.title}</h1>
      <div className={styles.navigationButton}>
        <Link href="/admin">
          <button>Go to Admin Page</button>
        </Link>
      </div>
      {submitted ? (
        <>
          <p className={styles.successMessage}>
            Thank you for voting! You have already submitted your vote.
          </p>
          <div className={styles.resultsButton}>
            <Link href="/results">
              <button>View Results</button>
            </Link>
          </div>
        </>
      ) : (
        <div>
          {poll.options.map((option, index) => (
            <div key={index} className={styles.optionCard}>
              <p className={styles.optionTitle}>{option.text}</p>
              <div className={styles.voteOptions}>
                <label className={styles.voteButton}>
                  <input
                    type="radio"
                    name={`vote${index}`}
                    onChange={() => handleVoteChange(option.text, 3)}
                  />
                  Love (+3)
                </label>
                <label className={styles.voteButton}>
                  <input
                    type="radio"
                    name={`vote${index}`}
                    onChange={() => handleVoteChange(option.text, 2)}
                  />
                  Like (+2)
                </label>
                <label className={styles.voteButton}>
                  <input
                    type="radio"
                    name={`vote${index}`}
                    onChange={() => handleVoteChange(option.text, -2)}
                  />
                  Dislike (-2)
                </label>
              </div>
            </div>
          ))}
          <button className={styles.submitButton} onClick={handleSubmit}>
            Submit Vote
          </button>
        </div>
      )}
    </div>
  );
}