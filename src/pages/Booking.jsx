
function Booking({ bookingItems, onIncrease, onDecrease, onRemove }) {
  const total = bookingItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="booking-page">
      <h1>My Booking</h1>

      {bookingItems.length === 0 ? (
        <p>Your booking cart is empty.</p>
      ) : (
        <>
          <div className="booking-list">
            {bookingItems.map(item => (
              <div className="booking-item" key={item.name}>
                <div>
                  <h3>{item.name}</h3>
                  <p>PKR {item.price} per session</p>
                  <p>Quantity: {item.quantity}</p>
                  <strong>
                    Subtotal: PKR {item.price * item.quantity}
                  </strong>
                </div>

                <div className="booking-actions">
                  <button onClick={() => onDecrease(item.name)}>
                    -
                  </button>

                  <button onClick={() => onIncrease(item.name)}>
                    +
                  </button>

                  <button onClick={() => onRemove(item.name)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2>Total: PKR {total}</h2>
        </>
      )}
    </section>
  );
}

export default Booking;
