
import { useState } from "react";

function BookingForm({ onConfirm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    onConfirm({ name, email });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2>Customer Details</h2>

      <label>Full Name</label>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter your name"
      />

      <label>Email Address</label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
      />

      {error && <p className="form-error">{error}</p>}

      <button type="submit">Confirm Booking</button>
    </form>
  );
}

export default BookingForm;
