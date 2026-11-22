import { useBooking } from "../state/BookingContext.jsx";

export default function Footer() {
  const { demoFailure, demoCapacity, toggleFailure, toggleCapacity } = useBooking();
  return <footer className="site-footer">
    <div><strong>fitform.</strong><p>Small-group movement, made easier.</p><span>F-6, Islamabad · Simulated booking experience</span></div>
    <details className="demo-panel">
      <summary>Demo controls</summary>
      <label><input type="checkbox" checked={demoFailure} onChange={e => toggleFailure(e.target.checked)} /> Simulate class-loading failure</label>
      <label><input type="checkbox" checked={demoCapacity} onChange={e => toggleCapacity(e.target.checked)} /> Mark Strength Foundations as full</label>
      <small>Turn a setting off and use Retry / refresh to restore normal data.</small>
    </details>
  </footer>;
}