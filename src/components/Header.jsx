import { Link, NavLink } from "react-router-dom";
import { useBooking } from "../state/BookingContext.jsx";

export default function Header() {
  const { items } = useBooking();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return <header className="site-header">
    <Link className="brand" to="/" aria-label="FitForm home"><span className="brand-mark">F</span><span>fitform<span className="brand-dot">.</span><small>ISLAMABAD</small></span></Link>
    <nav aria-label="Main navigation">
      <NavLink to="/" end>Explore classes</NavLink>
      <NavLink to="/booking">Your plan <span className="nav-count">{count}</span></NavLink>
    </nav>
  </header>;
}