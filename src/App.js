import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  // ✅ DARK MODE STATE
  const [darkMode, setDarkMode] = useState(false);

  // ✅ LIGHT & DARK PALETTES
  const colors = darkMode
    ? {
        bg: "#2f4f4f",
        card: "#3e5c5c",
        text: "#ffffff",
        blue: "#00bfff",
        green: "#00ff7f",
        tableHeader: "#5f9ea0",
        tableRow: "#4b7d7d",
      }
    : {
        bg: "#f0f8ff",
        card: "#ffffff",
        text: "#333333",
        blue: "#1e90ff",
        green: "#32cd32",
        tableHeader: "#4682b4",
        tableRow: "#e6f3ff",
      };

  // ✅ LOGIN STATE
  const [loggedIn, setLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [gender, setGender] = useState("");
  const [loginName, setLoginName] = useState("");

  // ✅ VOTING STATES
  const [voterName, setVoterName] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [electionOpen, setElectionOpen] = useState(true);
  const [voteMessage, setVoteMessage] = useState("");
  const [showVoteSuccess, setShowVoteSuccess] = useState(false);

  const [candidates, setCandidates] = useState([
    { id: 1, name: "Ruto", votes: 0 },
    { id: 2, name: "Sifuna", votes: 0 },
    { id: 3, name: "Matiang'i", votes: 0 }
  ]);

  // ✅ LOGIN HANDLER
  const handleLogin = () => {
    if (!firstName.trim() || !lastName.trim() || !idNumber.trim() || !gender) {
      alert("Please fill in all fields");
      return;
    }
    if (!/^\d{1,8}$/.test(idNumber)) {
      alert("ID Number must be 1-8 digits only");
      return;
    }
    setLoggedIn(true);
    setVoterName(`${firstName} ${lastName}`);
  };

  const vote = (id) => {
    if (hasVoted) {
      alert("You have already voted");
      return;
    }

    if (!electionOpen) {
      alert("Election is closed");
      return;
    }

    const updatedCandidates = candidates.map(candidate =>
      candidate.id === id
        ? { ...candidate, votes: candidate.votes + 1 }
        : candidate
    );

    setCandidates(updatedCandidates);
    setHasVoted(true);
    const pronoun = gender === "Male" ? "his" : gender === "Female" ? "her" : "their";
    const message = `${firstName} ${lastName} with ID ${idNumber} has ${pronoun} vote securely casted.`;
    setVoteMessage(message);
    setShowVoteSuccess(true);
    setTimeout(() => setShowVoteSuccess(false), 5000);
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

  // ✅ PIE CHART DATA
  const pieData = {
    labels: candidates.map(c => c.name),
    datasets: [
      {
        data: candidates.map(c => c.votes),
        backgroundColor: ["#4ea8de", "#52b788", "#f9c74f"],
        borderWidth: 1,
      },
    ],
  };

  // ✅ LOGIN PAGE
  if (!loggedIn) {
    return (
      <div style={{
        textAlign: "center",
        marginTop: "100px",
        backgroundColor: colors.bg,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.72), rgba(0,0,0,0.25)), url('https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Kenya.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
        color: colors.text
      }}>
        <h1 style={{ color: colors.blue }}>Login to Vote</h1>

        <div style={{ display: "flex", justifyContent: "center", gap: "14px", alignItems: "center", marginBottom: "20px" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/ec/IEBC_Logo.png"
            alt="IEBC Logo"
            style={{ width: "60px", height: "60px", objectFit: "contain", borderRadius: "10px", boxShadow: "0 0 8px rgba(0,0,0,0.2)" }}
            onError={(e) => { e.target.src = "https://via.placeholder.com/60?text=IEBC"; }}
          />
          <span style={{ fontSize: "24px", fontWeight: "800", color: colors.text }}>
            🇰🇪 Kenya National Voting
          </span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Kenya.svg"
            alt="Kenyan Flag"
            style={{ width: "80px", height: "50px", objectFit: "cover", borderRadius: "6px", boxShadow: "0 0 8px rgba(0,0,0,0.2)" }}
            onError={(e) => { e.target.src = "https://via.placeholder.com/80x50?text=KENYA"; }}
          />
        </div>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{
            padding: "12px",
            width: "260px",
            borderRadius: "8px",
            border: `2px solid ${colors.green}`,
            marginBottom: "10px",
          }}
        />

        <br />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{
            padding: "12px",
            width: "260px",
            borderRadius: "8px",
            border: `2px solid ${colors.green}`,
            marginBottom: "10px",
          }}
        />

        <br />

        <input
          type="text"
          placeholder="ID Number (1-8 digits)"
          value={idNumber}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 8);
            setIdNumber(digitsOnly);
          }}
          pattern="[0-9]{1,8}"
          maxLength="8"
          style={{
            padding: "12px",
            width: "260px",
            borderRadius: "8px",
            border: `2px solid ${colors.green}`,
            marginBottom: "10px",
          }}
        />

        <br />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{
            padding: "12px",
            width: "260px",
            borderRadius: "8px",
            border: `2px solid ${colors.green}`,
            marginBottom: "20px",
          }}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <br />

        <button
          onClick={handleLogin}
          style={{
            padding: "10px 25px",
            backgroundColor: colors.blue,
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    );
  }

  //  VOTING PAGE
  return (
    <div style={{
      textAlign: "center",
      padding: "25px",
      backgroundColor: colors.bg,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(0,0,0,0.2)), url('https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Kenya.svg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      color: colors.text
    }}>

      {/*  DARK MODE TOGGLE */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          backgroundColor: colors.card,
          color: colors.text,
          padding: "10px 20px",
          borderRadius: "8px",
          border: "1px solid gray",
          cursor: "pointer",
          position: "absolute",
          right: "20px",
          top: "20px"
        }}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1 style={{ color: colors.blue }}>KENYA KURA SYSTEM</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "12px", alignItems: "center", marginBottom: "14px" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/ec/IEBC_Logo.png"
          alt="IEBC Logo"
          style={{ width: "50px", height: "50px", objectFit: "contain" }}
          onError={(e) => { e.target.src = "https://via.placeholder.com/50?text=IEBC"; }}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Kenya.svg"
          alt="Kenyan Flag"
          style={{ width: "70px", height: "44px", objectFit: "cover" }}
          onError={(e) => { e.target.src = "https://via.placeholder.com/70x44?text=KENYA"; }}
        />
      </div>

      <h2 style={{ color: electionOpen ? colors.green : "red" }}>
        {electionOpen ? "Election Open ✅" : "Election Closed ❌"}
      </h2>

      <p style={{ fontSize: "16px", color: colors.text, marginTop: "4px" }}>
        Logged in as {firstName} {lastName} ({gender}), ID {idNumber}
      </p>

      {voteMessage && showVoteSuccess && (
        <div style={{
          fontSize: "17px",
          fontWeight: "bold",
          color: "#006400",
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#d4edda",
          border: "1px solid #c3e6cb",
          borderRadius: "5px",
          opacity: showVoteSuccess ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          animation: "fadeIn 0.5s"
        }}>
          {voteMessage}
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {candidates.map(candidate => (
          <div key={candidate.id} style={{
            margin: "20px 0",
            backgroundColor: colors.card,
            width: "300px",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            borderLeft: `6px solid ${colors.green}`,
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <h3 style={{ color: colors.blue }}>{candidate.name}</h3>

            <button
              onClick={() => vote(candidate.id)}
              disabled={!electionOpen || hasVoted}
              style={{
                padding: "10px 20px",
                backgroundColor: colors.blue,
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginBottom: "10px",
                transition: "background-color 0.3s"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseLeave={(e) => e.target.style.backgroundColor = colors.blue}
            >
              Vote
            </button>

            <p style={{ color: colors.green, fontWeight: "bold" }}>
              Votes: {candidate.votes}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={closeElection}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 22px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Close Election
      </button>

      {/* ✅ WINNER */}
      {!electionOpen && (
        <>
          <h2 style={{ color: colors.blue, marginTop: "30px" }}>Winner 🏆</h2>
          <h3>{getWinner().name}</h3>
          <p>Total Votes: {getWinner().votes}</p>

          {/* ✅ RESULTS TABLE */}
          <h2 style={{ marginTop: "40px", color: colors.blue }}>📊 Final Results</h2>

          <table style={{
            margin: "0 auto",
            width: "60%",
            borderCollapse: "collapse",
            borderRadius: "10px",
            overflow: "hidden"
          }}>
            <thead>
              <tr style={{ backgroundColor: colors.tableHeader, color: "white" }}>
                <th style={{ padding: "12px" }}>Candidate</th>
                <th style={{ padding: "12px" }}>Votes</th>
              </tr>
            </thead>

            <tbody>
              {candidates.map(c => (
                <tr key={c.id} style={{ backgroundColor: colors.tableRow }}>
                  <td style={{ padding: "10px" }}>{c.name}</td>
                  <td style={{ padding: "10px" }}>{c.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ PIE CHART */}
          <div style={{ width: "400px", margin: "40px auto" }}>
            <Pie data={pieData} />
          </div>

          {/* Founder */}
          <footer style={{ marginTop: "20px", color: colors.text, fontSize: "14px" }}>
            Founded by Spectre Soita SE
          </footer>
        </>
      )}
    </div>
  );
}

export default App;