import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBooking } from "../state/BookingContext.jsx";
import { calculateBookingFee, validateLevelCompatibility, validateQuantity } from "../rules/businessRules.mjs";

export default function Booking() {
  const { items, classesData, setQuantity, removeItem, clearItems } = useBooking();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", experience: "Beginner", slot: "", notes: "" });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const selected = useMemo(() => items.map(entry => {
    const item = classesData.find(x => x.id === entry.id);
    return item ? { ...item, quantity: entry.quantity } : null;
  }).filter(Boolean), [items, classesData]);
  const count = selected.reduce((sum, x) => sum + x.quantity, 0);
  const subtotal = selected.reduce((sum, x) => sum + x.price * x.quantity, 0);
  const fee = calculateBookingFee(subtotal);
  const total = subtotal + fee;
  const levelCheck = validateLevelCompatibility(selected, form.experience);

  function update(name, value) {
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
    setNotice("");
  }
  function handleSubmit(event) {
    event.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Enter a name with at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (!form.slot) next.slot = "Choose a preferred arrival window.";
    if (!levelCheck.valid) next.experience = levelCheck.message;
    if (!selected.length) next.general = "Add at least one class before continuing.";
    selected.forEach(item => {
      const check = validateQuantity(item.quantity, item.remainingSeats);
      if (!check.valid) next.general = `${item.name}: ${check.message}`;
    });
    setErrors(next);
    if (Object.keys(next).length) return;
    const confirmation = { reference: `FF-${Date.now().toString().slice(-7)}`, form, selected, subtotal, fee, total, createdAt: new Date().toISOString() };
    sessionStorage.setItem("fitform-confirmation", JSON.stringify(confirmation));
    clearItems();
    navigate("/confirmation");
  }

  return <main className="page-wrap">
    <div className="breadcrumbs"><Link to="/">Classes</Link><span>/</span>Booking plan</div>
    <div className="section-heading booking-heading"><div><span className="eyebrow">STEP 02 · REVIEW & BOOK</span><h1>Your booking plan</h1><p className="muted">Adjust your choices, check the conditions, then complete the simulated booking form.</p></div></div>
    {!selected.length ? <div className="state-panel"><h2>Your plan is empty.</h2><p>Explore the schedule and add a class to get started.</p><Link className="button button-dark" to="/">Browse classes</Link></div> :
    <div className="booking-layout">
      <section className="booking-main">
        <div className="panel">
          <div className="panel-heading"><h2>Selected classes <span className="count-pill">{count}</span></h2><Link to="/">+ Add another</Link></div>
          {selected.map(item => <div className="booking-item" key={item.id}><div className="booking-item-info"><strong>{item.name}</strong><span>{item.day} · {item.time} · PKR {item.price.toLocaleString("en-PK")} each</span><small>{item.remainingSeats} places currently available</small></div><label>Places <select value={item.quantity} onChange={e => { const result = setQuantity(item.id, Number(e.target.value)); if (!result.valid) setNotice(result.message); else setNotice(""); }}>{[1,2,3,4].filter(n => n <= item.remainingSeats || n === item.quantity).map(n => <option key={n} value={n}>{n}</option>)}</select></label><strong>PKR {(item.price * item.quantity).toLocaleString("en-PK")}</strong><button className="remove-button" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>Remove</button></div>)}
          {selected.some(item => item.remainingSeats < item.quantity || item.remainingSeats === 0) && <p className="notice notice-error" role="alert">Availability has changed for one or more saved selections. Adjust the places or remove the unavailable class before confirming.</p>}
          {notice && <p className="notice notice-error" role="alert">{notice}</p>}
          {errors.general && <p className="notice notice-error" role="alert">{errors.general}</p>}
        </div>
        <form className="panel booking-form" onSubmit={handleSubmit} noValidate>
          <span className="eyebrow">YOUR DETAILS</span><h2>Complete your booking</h2><p className="muted">This is a frontend demonstration. No payment or external submission will take place.</p>
          <div className="form-grid">
            <label className="field">Full name<input value={form.name} onChange={e => update("name", e.target.value)} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} placeholder="Your name" />{errors.name && <small className="field-error" id="name-error">{errors.name}</small>}</label>
            <label className="field">Email address<input type="email" value={form.email} onChange={e => update("email", e.target.value)} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} placeholder="you@example.com" />{errors.email && <small className="field-error" id="email-error">{errors.email}</small>}</label>
            <label className="field">Your experience level<select value={form.experience} onChange={e => update("experience", e.target.value)}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>{errors.experience && <small className="field-error">{errors.experience}</small>}</label>
            <label className="field">Preferred arrival window<select value={form.slot} onChange={e => update("slot", e.target.value)}><option value="">Choose a window</option><option>10 minutes early</option><option>15 minutes early</option><option>At scheduled time</option></select>{errors.slot && <small className="field-error">{errors.slot}</small>}</label>
            <label className="field full-field">Optional note<textarea value={form.notes} onChange={e => update("notes", e.target.value)} rows="3" maxLength="240" placeholder="Anything the coach should know? (optional)" /></label>
          </div>
          <div className="rule-callout"><strong>Experience compatibility</strong><p>{levelCheck.valid ? `Your ${form.experience.toLowerCase()} level is compatible with the selected classes.` : levelCheck.message}</p><small>Beginner can book beginner classes; Intermediate can book beginner and intermediate; Advanced can book all levels.</small></div>
          <button className="button button-dark button-wide" type="submit">Confirm simulated booking · PKR {total.toLocaleString("en-PK")}</button>
        </form>
      </section>
      <aside className="summary-card"><span className="eyebrow">ORDER SUMMARY</span><h2>Booking total</h2><div className="summary-line"><span>Places</span><strong>{count}</strong></div><div className="summary-line"><span>Class subtotal</span><strong>PKR {subtotal.toLocaleString("en-PK")}</strong></div><div className="summary-line"><span>Booking fee</span><strong>{fee === 0 ? "Waived" : `PKR ${fee}`}</strong></div><p className="fee-hint">{subtotal >= 5000 ? "Your subtotal qualifies for a waived booking fee." : `Spend PKR ${(5000 - subtotal).toLocaleString("en-PK")} more to waive the PKR 150 fee.`}</p><div className="summary-total"><span>Total</span><strong>PKR {total.toLocaleString("en-PK")}</strong></div><p className="summary-foot">No payment is collected. This is a simulated booking.</p></aside>
    </div>}
  </main>;
}