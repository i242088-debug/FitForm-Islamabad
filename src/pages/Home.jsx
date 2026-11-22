import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useBooking } from "../state/BookingContext.jsx";
import ClassCard from "../components/ClassCard.jsx";
import LoadingState from "../components/LoadingState.jsx";

export default function Home() {
  const { classesData, status, error, retry } = useBooking();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("recommended");
  const categories = ["All", ...new Set(classesData.map(x => x.category))];
  const filtered = useMemo(() => {
    let result = classesData.filter(x => `${x.name} ${x.category} ${x.level} ${x.trainer} ${x.day}`.toLowerCase().includes(search.toLowerCase()));
    if (category !== "All") result = result.filter(x => x.category === category);
    return [...result].sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : sort === "duration" ? a.duration - b.duration : a.name.localeCompare(b.name));
  }, [classesData, search, category, sort]);

  return <main>
    <section className="hero">
      <div className="hero-copy"><div className="eyebrow light">MOVE WELL. FEEL READY.</div><h1>Find your kind<br />of <em>strong.</em></h1><p>Small-group classes, thoughtful coaching, and a schedule that fits real life.</p><a className="button button-lime" href="#class-list">Explore the schedule <span>↓</span></a><div className="hero-note">12 weekly sessions <span>·</span> F-6, Islamabad</div></div>
      <div className="hero-visual" aria-label="Abstract fitness-inspired graphic"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="hero-stamp">MOVE<br />WITH<br /><b>INTENT</b></div><div className="hero-number">01<span> / 04</span></div></div>
    </section>
    <section className="intro-strip"><div><span className="eyebrow">THE FITFORM APPROACH</span><h2>Good movement.<br /><em>No guesswork.</em></h2></div><p>Compare the details that matter before you book: class level, duration, coach, price and remaining places — all in one view.</p><div className="strip-stat"><strong>12</strong><span>weekly sessions</span></div></section>
    <section className="schedule-section" id="class-list">
      <div className="section-heading"><div><span className="eyebrow">YOUR NEXT SESSION</span><h2>Explore classes</h2><p className="muted">Find a session that matches your goals and experience.</p></div><span className="result-count">{classesData.length} SESSIONS</span></div>
      {status === "loading" && <LoadingState />}
      {status === "error" && <div className="state-panel error-panel" role="alert"><strong>We couldn't load the schedule.</strong><p>{error}</p><button className="button button-dark" onClick={retry}>Retry loading</button></div>}
      {status === "success" && <>
        <div className="filters">
          <label className="search-field"><span className="sr-only">Search classes</span><span aria-hidden="true">⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search class, coach or day…" /></label>
          <label><span className="sr-only">Filter by category</span><select value={category} onChange={e => setCategory(e.target.value)}>{categories.map(x => <option key={x}>{x}</option>)}</select></label>
          <label><span className="sr-only">Sort classes</span><select value={sort} onChange={e => setSort(e.target.value)}><option value="recommended">Sort: A–Z</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="duration">Shortest duration</option></select></label>
        </div>
        {classesData.length === 0 ? <div className="state-panel"><strong>No classes are currently listed.</strong><p>Please check back later or contact the studio.</p></div> :
          filtered.length === 0 ? <div className="state-panel"><strong>No matching classes.</strong><p>Try another search term or clear the category filter.</p><button className="button button-outline" onClick={() => { setSearch(""); setCategory("All"); }}>Clear search and filters</button></div> :
          <div className="class-grid">{filtered.map(item => <ClassCard key={item.id} item={item} />)}</div>}
      </>}
    </section>
    <section className="bottom-cta"><div><span className="eyebrow light">MAKE A PLAN</span><h2>Your next session<br /><em>starts here.</em></h2></div><Link className="button button-lime" to="/booking">Review your plan ↗</Link></section>
  </main>;
}