import { Link } from "react-router-dom";

export default function ClassCard({ item }) {
  const full = item.remainingSeats === 0;
  return <article className="class-card">
    <div className={`class-art art-${item.category.toLowerCase()}`} aria-hidden="true"><span>{item.category}</span><b>{item.duration}<small> MIN</small></b></div>
    <div className="class-card-body">
      <div className="eyebrow">{item.level} <span>·</span> {item.intensity}</div>
      <h3><Link to={`/classes/${item.id}`}>{item.name}</Link></h3>
      <p className="muted">{item.day} · {item.time} · {item.trainer}</p>
      <div className="card-bottom"><strong>PKR {item.price.toLocaleString("en-PK")}</strong><span className={full ? "status-full" : "status-open"}>{full ? "Fully booked" : `${item.remainingSeats} places left`}</span></div>
      <Link className="text-link" to={`/classes/${item.id}`}>View class details <span aria-hidden="true">↗</span></Link>
    </div>
  </article>;
}