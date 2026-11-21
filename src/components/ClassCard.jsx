function ClassCard({ fitnessClass, onViewDetails }) {
  return (
    <div className="class-card">
      <span className="category">{fitnessClass.category}</span>

      <h3>{fitnessClass.name}</h3>

      <p>{fitnessClass.description}</p>

      <div className="class-info">
        <p>Coach: {fitnessClass.coach}</p>
        <p>Duration: {fitnessClass.duration} minutes</p>
        <p>Level: {fitnessClass.level}</p>
        <p>Available Seats: {fitnessClass.seats}</p>
      </div>

      <div className="class-bottom">
        <strong>PKR {fitnessClass.price}</strong>
        <button onClick={() => onViewDetails(fitnessClass)}>
          View Details
        </button>
      </div>
    </div>
  );
}

export default ClassCard;