import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ texts = {}, images = [] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dynamicRatio, setDynamicRatio] = useState("3/4");
  const [isImageLoaded, setIsImageLoaded] = useState(true); 

  const heroRef = useRef();
  const dynamicMaxWidth = texts.setting_hero_width || "480px";

  useEffect(() => {
    if (images && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3500);

      return () => clearInterval(interval);
    }
  }, [images]);

  const handleImageLoad = (e, index) => {
    if (index === 0) {
      const width = e.target.naturalWidth;
      const height = e.target.naturalHeight;
      if (width && height) {
        setDynamicRatio(`${width} / ${height}`);
      }
      setIsImageLoaded(true);
    }
  };

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-greeting",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      )
        .fromTo(
          ".hero-name",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          ".hero-role",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .fromTo(
          ".hero-buttons",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        );

      gsap.fromTo(
        ".hero-image-wrapper",
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.3 },
      );

      gsap.to(".hero-content", {
        y: -40,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-image-wrapper", {
        y: -60,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: heroRef },
  );

  return (
    <section className="hero-container" id="home" ref={heroRef}>
      <div className="ambient-glow"></div>

      <div className="hero-content">
        <p className="hero-greeting">Portfolio of</p>
        <h1 className="hero-name">{texts.hero_name || "Loading..."}</h1>
        <h3 className="hero-role">
          {texts.hero_role || "Cinematic Photographer"}
        </h3>

        <div className="hero-buttons">
          <a href="#projects" className="primary-btn">
            Explore Work
          </a>
          <a href="#contact" className="secondary-btn">
            Contact Me
          </a>
        </div>
      </div>

      <div className="hero-image-wrapper">
        {images.length > 0 ? (
          <div
            className="slider-container"
            style={{
              aspectRatio: dynamicRatio,
              maxWidth: dynamicMaxWidth,
              opacity: isImageLoaded ? 1 : 0,
              visibility: isImageLoaded ? "visible" : "hidden",
              transition: "opacity 0.8s ease-in",
            }}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Portfolio ${index + 1}`}
                onLoad={(e) => handleImageLoad(e, index)}
                className={`hero-profile-pic ${index === currentImageIndex ? "active" : "hidden"}`}
              />
            ))}
          </div>
        ) : (
          <div
            className="skeleton-loader"
            style={{ maxWidth: dynamicMaxWidth }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default Hero;
