import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { Concert } from "./Types.tsx";

const ConcertsList = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  useEffect(() => {
    fetch("http://localhost/concerts/concerts")
      .then((res) => res.json())
      .then((fetchedConcerts) => setConcerts(fetchedConcerts));
  }, []);
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="concert-list">
      <h2>Upcoming Concerts</h2>
      {auth.isAuthenticated ? (
        <p className="auth-status">🎟️ You are logged in!</p>
      ) : (
        <p className="auth-status">🔒 Please log in before buying tickets</p>
      )}
      {!auth.isAuthenticated && (
        <button className="login-btn" onClick={() => navigate("/login")}>
          Log in
        </button>
      )}
      <div className="concerts-container">
        {concerts.map((concert, index) => (
          <div key={index} className="concert-card">
            <h3>{concert.eventname}</h3>
            <p>Artist: {concert.artist}</p>
            {auth.isAuthenticated && (
              <button className="details-btn" onClick={() => navigate(`/concerts/${concert._id}`)}>
                See details
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConcertsList;