
function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="tagline">YOUR FITNESS JOURNEY STARTS HERE</p>
          <h1>Build Strength.<br />Find Your Balance.</h1>
          <p>
            Discover fitness classes designed to help you
            stay active, confident and healthy.
          </p>
          <a href="#classes" className="primary-button">
            Explore Classes
          </a>
        </div>
      </section>

      <section className="about" id="about">
        <h2>Welcome to FitForm</h2>
        <p>
          FitForm Islamabad makes it easier to discover and
          book fitness sessions that match your goals.
        </p>
      </section>

      <section className="class-preview" id="classes">
        <h2>Find Your Perfect Class</h2>
        <p>From strength training to yoga, find a session that suits you.</p>
      </section>
    </>
  );
}

export default Home;
