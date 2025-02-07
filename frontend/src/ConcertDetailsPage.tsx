import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Concert } from "./Types.tsx";
import { useAuth } from "./AuthContext.tsx";

const ConcertDetailsPage = () => {
  const { concertId } = useParams();
  const [concert, setConcert] = useState<Concert>();
  useEffect(() => {
    fetch(`http://localhost/concerts/concerts/${concertId}`)
      .then((res) => res.json())
      .then((fetchedConcert) => setConcert(fetchedConcert));
  }, [concertId]);

  const auth = useAuth();

  const onBuyTicket = () => {
    fetch(`http://localhost/tickets/${concertId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: auth.token }),
    })
      .then(() => {
        alert("🎫 Ticket purchased successfully!");
      })
      .catch((err) => {
        console.log(err);
        alert("❌ Could not buy ticket!");
      });
  };

  if (!concert) {
    return <p className="loading">Loading concert details...</p>;
  }
  return (
    <div className="concert-details">
      <h2>{concert.eventname}</h2>
      <p>Artist: {concert.artist}</p>
      <p>Location: {concert.location}</p>
      <button className="buy-ticket-btn" onClick={onBuyTicket}>Buy Ticket</button>
    </div>
  );
};

export default ConcertDetailsPage;