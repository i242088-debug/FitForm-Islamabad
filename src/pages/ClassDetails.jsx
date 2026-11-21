function ClassDetails({ classItem, onAddToBooking, onBack }) {
  if (!classItem) return null;

  return (
    <section className="class-details">
      <button onClick={onBack} className="back-btn">
        Back to Classes
      </button>

      <h2>{classItem.name}</h2>
      <p>{classItem.description}</p>

      <div className="details-info">
        <p><strong>Category:</strong> {classItem.category}</p>
        <p><strong>Coach:</strong> {classItem.coach}</p>
        <p><strong>Duration:</strong> {classItem.duration}</p>
        <p><strong>Level:</strong> {classItem.level}</p>
        <p><strong>Available Seats:</strong> {classItem.seats}</p>
        <p><strong>Price:</strong> PKR {classItem.price}</p>
      </div>

      <button
        className="add-booking-btn"
        onClick={() => onAddToBooking(classItem)}
      >
        Add to Booking
      </button>
    </section>
  );
}

export default ClassDetails;