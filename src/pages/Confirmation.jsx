import { Link, Navigate } from "react-router-dom";

export default function Confirmation() {
  let booking = null;
  try { booking = JSON.parse(sessionStorage.getItem("fitform-confirmation") || "null"); } catch { booking = null; }
  if (!booking) return <Navigate to="/booking" replace />;
  return <main className="page-wrap confirmation-wrap">
    <div className="success-icon" aria-hidden="true">✓</div><span className="eyebrow">BOOKING REQUEST RECORDED</span><h1>You're on the<br /><em>schedule.</em></h1><p className="confirmation-lead">Your FitForm booking has been simulated successfully. No payment was taken and no external service was contacted.</p>
    <section className="confirmation-card"><div className="confirmation-top"><span>REFERENCE</span><strong>{booking.reference}</strong></div><div className="confirmation-top"><span>BOOKING NAME</span><strong>{booking.form.name}</strong></div><div className="confirmation-top"><span>EMAIL</span><strong>{booking.form.email}</strong></div><h2>Selected sessions</h2>{booking.selected.map(item => <div className="summary-line" key={item.id}><span>{item.name} × {item.quantity}</span><strong>PKR {(item.price * item.quantity).toLocaleString("en-PK")}</strong></div>)}<div className="summary-line"><span>Booking fee</span><strong>{booking.fee === 0 ? "Waived" : `PKR ${booking.fee}`}</strong></div><div className="summary-total"><span>Total</span><strong>PKR {booking.total.toLocaleString("en-PK")}</strong></div></section>
    <Link className="button button-dark" to="/">Back to class schedule</Link>
  </main>;
}