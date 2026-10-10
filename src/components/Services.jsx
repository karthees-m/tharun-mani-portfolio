import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

const Services = ({ texts = {} }) => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".service-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const servicesMap = {};
  Object.keys(texts).forEach((key) => {
    if (key.startsWith("serv_")) {
      const parts = key.split("_");
      const servId = parts[1];
      const fieldType = parts.slice(2).join("_");

      if (!servicesMap[servId]) {
        servicesMap[servId] = {
          id: servId,
          title: "",
          description: "",
          price: "",
        };
      }

      if (fieldType === "title") servicesMap[servId].title = texts[key];
      else if (fieldType === "desc")
        servicesMap[servId].description = texts[key];
      else if (fieldType === "price") servicesMap[servId].price = texts[key];
    }
  });

  let servicesList = Object.values(servicesMap);

  if (servicesList.length === 0) {
    servicesList = [
      {
        id: "1",
        title: "Cinematic Wedding Films",
        description:
          "Capturing your special day with high-end cinematic storytelling and multi-camera setup.",
        price: "Starting at $1,500",
      },
      {
        id: "2",
        title: "Commercial Brand Ads",
        description:
          "Elevating brands with striking visuals, high-production value, and expert color grading.",
        price: "Custom Quote",
      },
      {
        id: "3",
        title: "Fashion & Portrait",
        description:
          "Professional studio and outdoor portrait sessions tailored for models, artists, and brands.",
        price: "Starting at $500",
      },
      {
        id: "4",
        title: "Aerial Drone Cinematography",
        description:
          "Breathtaking 4K ultra-HD drone footage to add a grand cinematic scale to any project.",
        price: "Starting at $300",
      },
    ];
  }

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="services-header">
        <div className="subtitle-badge">
          <span>What I Offer</span>
        </div>
        <h2 className="section-title">Specialized Services</h2>
        <p className="services-subtitle">
          Tailored visual production packages designed to bring your vision to
          life.
        </p>
      </div>

      <div className="services-grid">
        {servicesList.length > 0 &&
          servicesList.map((service, index) => (
            <div className="service-card" key={service.id || index}>
              <div className="service-card-header">
                <span className="service-number">0{index + 1}</span>
                <span className="service-price">{service.price}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-card-footer">
                <a href="#contact" className="book-service-link">
                  Inquire Now →
                </a>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Services;
