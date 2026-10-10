import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const About = ({ texts = {}, images = [], videos = [] }) => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".about-content-wrapper > *",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
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

  const aboutText =
    texts.about_text ||
    "Behind every shutter click is a story waiting to be told. I specialize in cinematic storytelling, blending raw emotion with timeless aesthetics to preserve your most treasured chapters.";
  const bgVideoUrl = videos.length > 0 ? videos[0] : texts.about_bg_video;

  const stat1Num = texts.about_stat1_num || "1";
  const stat1Label = texts.about_stat1_label || "Years Experience";
  const stat2Num = texts.about_stat2_num || "2+";
  const stat2Label = texts.about_stat2_label || "Projects Done";

  const aboutImage =
    images.length > 0
      ? images[0]
      : texts.about_img_1 ||
        "https://images.unsplash.com/photo-1554048665-8b3c434947d6?w=500&auto=format&fit=crop";

  const rawSize = texts.about_img_size || "400px";
  const imageSize = rawSize.includes("px") ? rawSize : `${rawSize}px`;

  return (
    <section className="about-container" id="about" ref={sectionRef}>
      <div className="about-bg-wrapper">
        {bgVideoUrl ? (
          <video
            src={bgVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="about-bg-video"
          />
        ) : (
          <div className="about-bg-fallback"></div>
        )}
        <div className="about-blur-overlay"></div>
      </div>

      <div className="about-content-wrapper">
        <div className="about-ring-section" style={{ "--img-size": imageSize }}>
          <div className="rotating-ring-box">
            <svg className="rotating-text-svg" viewBox="0 0 350 350">
              <defs>
                <path
                  id="circlePath"
                  d="M 175, 175 m -135, 0 a 135,135 0 0,1 270,0 a 135,135 0 0,1 -270,0"
                />
              </defs>
              <text>
                <textPath href="#circlePath" startOffset="0%">
                  • CINEMATOGRAPHY • PHOTOGRAPHY • VISUAL ARTISTRY
                </textPath>
              </text>
            </svg>
          </div>

          <div className="center-image-container">
            <img
              src={aboutImage}
              alt="Photographer"
              className="center-ring-img"
            />
          </div>
        </div>

        <div className="about-text-section">
          <div className="subtitle-badge">
            <span>Behind The Lens</span>
          </div>
          <h2 className="section-title">Crafting Visual Stories</h2>
          <p className="about-description">{aboutText}</p>

          <div className="about-stats">
            <div className="stat-box">
              <h3>{stat1Num}</h3>
              <p>{stat1Label}</p>
            </div>
            <div className="divider-line"></div>
            <div className="stat-box">
              <h3>{stat2Num}</h3>
              <p>{stat2Label}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
