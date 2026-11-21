
import { useState } from "react";
import classes from "../data/classes";
import ClassCard from "../components/ClassCard";
import ClassDetails from "./ClassDetails";

function Classes({ onAddToBooking }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [selectedClass, setSelectedClass] = useState(null);

  const categories = ["All", ...new Set(classes.map(item => item.category))];

  let filteredClasses = classes.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "low") {
    filteredClasses.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filteredClasses.sort((a, b) => b.price - a.price);
  }

  if (selectedClass) {
    return (
      <ClassDetails
        classItem={selectedClass}
        onBack={() => setSelectedClass(null)}
        onAddToBooking={onAddToBooking}
      />
    );
  }

  return (
    <section className="classes-page">
      <h1>Explore Fitness Classes</h1>
      <p>Find a fitness session that matches your interests.</p>

      <div className="class-controls">
        <input
          type="text"
          placeholder="Search classes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">Default Order</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="class-grid">
        {filteredClasses.length > 0 ? (
          filteredClasses.map(item => (
            <ClassCard
              key={item.id || item.name}
              fitnessClass={item}
              onViewDetails={setSelectedClass}
            />
          ))
        ) : (
          <p>No classes found.</p>
        )}
      </div>
    </section>
  );
}

export default Classes;
