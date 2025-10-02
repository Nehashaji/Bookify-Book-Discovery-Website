// --------------- CTASection.jsx ---------------
// A simple Call-To-Action section encouraging users to start exploring
// Contains heading, subtitle, and a primary button

import React from "react";
import '../styles/ctasection.css'; // Import styles

const CTASection = () => {
  return (
    // CTA wrapper section with background image + overlay
    <section className="cta-section">
      <div className="container">
        {/* Heading */}
        <h2>Ready to find your next favorite book?</h2>

        {/* Subtitle / description */}
        <p>Join thousands of readers discovering amazing books every day</p>

        {/* Action button */}
        <button className="btn-primary">Start Exploring</button>
      </div>
    </section>
  );
};

export default CTASection;
