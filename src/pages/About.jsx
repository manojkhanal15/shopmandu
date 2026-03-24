import "./About.css";

const About = () => {
  const sections = [
    {
      title: "Our Story",
      text: "We are a modern fashion brand focused on delivering high-quality, stylish, and comfortable clothing. Our designs blend tradition with contemporary trends.",
    },
    {
      title: "Our Mission",
      text: "To provide premium fashion that is accessible, sustainable, and designed for everyday confidence.",
    },
    {
      title: "Our Values",
      text: "We believe in quality, sustainability, and customer-first design. Every piece is crafted with attention to detail and purpose.",
    },
  ];

  return (
    <div className="about">
      <div className="about-container">

        {/* Header */}
        <div className="about-header">
          <h1>About Us</h1>
          <p>Modern fashion. Timeless style.</p>
        </div>

        {/* Cards */}
        <div className="about-list">
          {sections.map((section) => (
            <div key={section.id} className="about-card">

              {/* Title */}
              <div className="about-card__header">
                <span className="about-number">{section.id}</span>
                <h2>{section.title}</h2>
              </div>

              {/* Text */}
              <p className="about-text">{section.text}</p>

              {/* CTA */}
              <div className="about-footer">
                <span className="read-more">Learn More →</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;