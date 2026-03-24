import React, { useState } from "react";

function App() {
  const [voterName, setVoterName] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [electionOpen, setElectionOpen] = useState(true);

  const [candidates, setCandidates] = useState([
    { id: 1, name: "Ruto", votes: 0 },
    { id: 2, name: "Sifuna", votes: 0 },
    { id: 3, name: "Matiang'i", votes: 0 }
  ]);

  const vote = (id) => {
    if (!voterName) {
      alert("Enter your name before voting");
      return;
    }

    if (hasVoted) {
      alert("You have already voted");
      return;
    }

    if (!electionOpen) {
      alert("Election ID is closed");
      return;
    }

    const updatedCandidates = candidates.map(candidate =>
      candidate.id === id
        ? { ...candidate, votes: candidate.votes + 1 }
        : candidate
    );

    setCandidates(updatedCandidates);
    setHasVoted(true);
  };

  const closeElection = () => {
    setElectionOpen(false);
  };

  const getWinner = () => {
    let winner = candidates[0];
    candidates.forEach(candidate => {
      if (candidate.votes > winner.votes) {
        winner = candidate;
      }
    });
    return winner;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Blockchain Secure Voting System</h1>

      <div>
        <input
          type="text"
          placeholder="Enter your name"
          value={voterName}
          onChange={(e) => setVoterName(e.target.value)}
        />
      </div>

      <h2>{electionOpen ? "Election Open" : "Election Closed"}</h2>

      {candidates.map(candidate => (
        <div key={candidate.id} style={{ margin: "20px" }}>
          <h3>{candidate.name}</h3>
          <button
            onClick={() => vote(candidate.id)}
            disabled={!electionOpen || hasVoted}
          >
            Vote
          </button>
          <p>Votes: {candidate.votes}</p>
        </div>
      ))}

      <br />

      <button onClick={closeElection}>Close Election</button>

      {!electionOpen && (
        <div>
          <h2>Winner 🏆</h2>
          <h3>{getWinner().name}</h3>
          <p>Total Votes: {getWinner().votes}</p>
        </div>
      )}

      {hasVoted && <p>You have successfully voted ✅</p>}
    </div>
  );
}

export default App;
