import React, { useEffect } from "react";
import "../styles/whychoose.css";
import { FaBookReader, FaUserShield, FaLock, FaMagic } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const WhyChooseUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const cards = [
    {
      icon: <FaBookReader />,
      title: "Endless Library",
      desc: "Explore thousands of titles from timeless classics to the latest bestsellers all in one elegant platform.",
    },
    {
      icon: <FaUserShield />,
      title: "Personal Library",
      desc: "Save your favorites, create collections, and manage your personal bookshelf effortlessly.",
    },
    {
      icon: <FaMagic />,
      title: "Beautiful Experience",
      desc: "Enjoy a seamless, visually appealing interface designed for reading across all devices.",
    },
        {
      icon: <FaLock />,
      title: "Safe & Private",
      desc: "Your data and preferences are secure enjoy a reading experience without annoying ads or tracking.",
    },
  ];

  return (
    <section className="why-choose">
      <div className="why-header" data-aos="fade-up">
        <h2>Why Choose <span>Bookify</span>?</h2>
        <p>
          Because great stories deserve an equally great experience.  
          Bookify combines elegance, simplicity, and technology to make reading feel timeless again.
        </p>
      </div>

      <div className="why-card-grid">
        {cards.map((card, i) => (
          <div
            key={i}
            className="why-card"
            data-aos="fade-up"
            data-aos-delay={i * 150}
          >
            <div className="why-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
