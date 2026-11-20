
function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="logo">FitForm</a>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="#about">About</a>
        <a href="#classes">Classes</a>
      </div>

      <a href="#classes" className="nav-button">Explore Classes</a>
    </nav>
  );
}

export default Navbar;
