import "./Journal.css";

const Journal = () => {
  const sections = [
    {
      title: "Latest Trends",
      text: "Discover how modern fashion is evolving with bold designs, minimal aesthetics, and streetwear influence.",
    },
    {
      title: "Style Guide",
      text: "Learn how to mix and match outfits, choose the right fit, and elevate your everyday fashion.",
    },
    {
      title: "Sustainability",
      text: "We believe in responsible fashion. Explore how eco-friendly materials and ethical production shape our collections.",
    },
  ];

  return (
    <div className="journal">
      <div className="journal-container">

        {/* Header */}
        <div className="journal-header">
          <h1>Journal</h1>
          <p>Stories, insights and inspiration from fashion</p>
        </div>

        {/* Cards */}
        <div className="journal-list">
          {sections.map((section) => (
            <div key={section.id} className="journal-card">
              
              {/* Title */}
              <div className="journal-card__header">
                <span className="journal-number">{section.id}</span>
                <h2>{section.title}</h2>
              </div>

              {/* Content */}
              <p className="journal-text">{section.text}</p>

              {/* CTA */}
              <div className="journal-footer">
                <span className="read-more">Read More →</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Journal;