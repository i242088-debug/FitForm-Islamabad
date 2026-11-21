
import { useState } from "react";
import BookingForm from "../components/BookingForm";

function Booking({
  bookingItems,
  onIncrease,
  onDecrease,
  onRemove,
  onUpdateExperience,
  onClear
}) {
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const subtotal = bookingItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const bookingFee = subtotal > 0 && subtotal < 5000 ? 150 : 0;
  const total = subtotal + bookingFee;

  const handleIncrease = (item) => {
    if (item.quantity >= 4) {
      setError("Maximum 4 places allowed per class.");
      return;
    }

    if (item.quantity >= item.seats) {
      setError("Not enough available seats.");
      return;
    }

    setError("");
    onIncrease(item.name);
  };

  const handleConfirm = (customer) => {
    if (bookingItems.length === 0) {
      setError("Your booking cart is empty.");
      return;
    }

    const invalidItem = bookingItems.find(item => {
      const allowedLevels = {
        Beginner: ["Beginner"],
        Intermediate: ["Beginner", "Intermediate"],
        Advanced: ["Beginner", "Intermediate", "Advanced"]
      };

      return (
        item.quantity < 1 ||
        item.quantity > 4 ||
        item.quantity > item.seats ||
        !allowedLevels[item.experienceLevel]?.includes(item.level)
      );
    });

    if (invalidItem) {
      setError(`Invalid booking details for ${invalidItem.name}.`);
      return;
    }

    setError("");

    setConfirmation({
      ...customer,
      total,
      classes: [...bookingItems]
    });
  };

  if (confirmation) {
    return (
      <section className="booking-page">
        <h1>Booking Confirmed!</h1>
        <p>Thank you, {confirmation.name}.</p>
        <p>Email: {confirmation.email}</p>

        <h3>Your Classes</h3>

        {confirmation.classes.map(item => (
          <p key={item.name}>
            {item.name} - {item.experienceLevel} - Quantity: {item.quantity}
          </p>
        ))}

        <h2>Total: PKR {confirmation.total}</h2>
      </section>
    );
  }

  return (
    <section className="booking-page">
      <h1>My Booking</h1>

      {bookingItems.length > 0 && (
        <button onClick={onClear}>Clear All Bookings</button>
      )}

      {bookingItems.length === 0 ? (
        <p>Your booking cart is empty.</p>
      ) : (
        <>
          <div className="booking-list">
            {bookingItems.map(item => {
              const allowedLevels = {
                Beginner: ["Beginner"],
                Intermediate: ["Beginner", "Intermediate"],
                Advanced: ["Beginner", "Intermediate", "Advanced"]
              };

              const availableLevels = Object.keys(allowedLevels).filter(
                level => allowedLevels[level].includes(item.level)
              );

              return (
                <div className="booking-item" key={item.name}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>PKR {item.price} per session</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Available Seats: {item.seats}</p>

                    <label>Experience Level:</label>
                    <select
                      value={item.experienceLevel}
                      onChange={e =>
                        onUpdateExperience(item.name, e.target.value)
                      }
                    >
                      {availableLevels.map(level => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>

                    <p>
                      Subtotal: PKR {item.price * item.quantity}
                    </p>
                  </div>

                  <div className="booking-actions">
                    <button onClick={() => onDecrease(item.name)}>-</button>
                    <button onClick={() => handleIncrease(item)}>+</button>
                    <button onClick={() => onRemove(item.name)}>Remove</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="booking-summary">
            <p>Subtotal: PKR {subtotal}</p>
            <p>Booking Fee: PKR {bookingFee}</p>
            <h2>Total: PKR {total}</h2>
          </div>

          <BookingForm onConfirm={handleConfirm} />
        </>
      )}

      {error && <p className="form-error">{error}</p>}
    </section>
  );
}

export default Booking;
