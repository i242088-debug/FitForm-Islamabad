import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBooking } from "../state/BookingContext.jsx";

export default function ClassDetails() {
  const { id } = useParams();
  const { classesData, status, addItem } = useBooking();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const item = classesData.find(x => x.id === id);
  if (status === "loading") return <main className="page-wrap"><div className="state-panel">Loading class details…</div></main>;
  if (!item) return <main className="page-wrap"><div className="state-panel error-panel"><span className="eyebrow">CLASS NOT FOUND</span><h1>This session isn't available.</h1><p>The link may be incorrect or the class may have been removed.</p><Link className="button button-dark" to="/">Back to all classes</Link></div></main>;
  const full = item.remainingSeats === 0;
  function handleAdd() {
    const result = addItem(item.id);
    if (result.valid) navigate("/booking");
    else setMessage(result.message);
  }
  return <main className="page-wrap">
    <div className="breadcrumbs"><Link to="/">Classes</Link><span>/</span>{item.name}</div>
    <section className="detail-layout">
      <div><div className={`detail-art art-${item.category.toLowerCase()}`}><span>{item.category}</span><b>{item.duration}<small> MINUTES</small></b></div><div className="detail-description"><span className="eyebrow">THE SESSION</span><h1>{item.name}</h1><p>{item.description}</p><h3>What's included</h3><ul className="included-list">{item.includes.map(x => <li key={x}>✓ {x}</li>)}</ul></div></div>
      <aside className="detail-aside"><span className="eyebrow">CLASS INFORMATION</span><div className="price-large">PKR {item.price.toLocaleString("en-PK")}<small> / person</small></div><dl className="detail-facts"><div><dt>Experience</dt><dd>{item.level}</dd></div><div><dt>Coach</dt><dd>{item.trainer}</dd></div><div><dt>Schedule</dt><dd>{item.day}, {item.time}</dd></div><div><dt>Location</dt><dd>{item.location}</dd></div><div><dt>Intensity</dt><dd>{item.intensity}</dd></div><div><dt>Availability</dt><dd>{full ? "Fully booked" : `${item.remainingSeats} places remaining`}</dd></div></dl>
        <p className={full ? "notice notice-error" : "notice"}>{full ? "This session is full. Try another class from the schedule." : "A maximum of 4 places per class can be added to one booking."}</p>
        <button className="button button-dark button-wide" disabled={full} onClick={handleAdd}>{full ? "Fully booked" : "Add 1 place to plan"}</button>
        {message && <p className="form-message" role="status">{message}</p>}
        <Link className="text-link" to="/booking">View your booking plan →</Link>
      </aside>
    </section>
  </main>;
}