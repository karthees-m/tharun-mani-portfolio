import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

const Projects = ({ texts = {} }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const isInteractingRef = useRef(false);
  const interactionTimeoutRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cinematic-header, .section-desc, .film-reel-container, .timeline-scroller-wrapper",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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

  const marqueeSetting =
    texts.proj_marquee || texts.marquee || texts.projects_marquee || "off";
  const isMarquee =
    marqueeSetting.toLowerCase() === "on" ||
    marqueeSetting.toLowerCase() === "true";

  const projectsMap = {};
  Object.keys(texts).forEach((key) => {
    if (key.startsWith("proj_") && !key.startsWith("proj_marquee")) {
      const parts = key.split("_");
      const projId = parts[1];
      const fieldType = parts.slice(2).join("_");

      if (!projectsMap[projId]) {
        projectsMap[projId] = {
          id: projId,
          title: "",
          category: "Cinematic",
          cover: "",
          videoUrl: "",
          gallery: [],
        };
      }

      if (fieldType === "title") projectsMap[projId].title = texts[key];
      else if (fieldType === "cat") projectsMap[projId].category = texts[key];
      else if (fieldType === "cover") projectsMap[projId].cover = texts[key];
      else if (fieldType === "video") projectsMap[projId].videoUrl = texts[key];
      else if (fieldType.startsWith("img_") || fieldType.startsWith("vid_")) {
        projectsMap[projId].gallery.push(texts[key]);
      }
    }
  });

  let projectsList = Object.values(projectsMap);

  if (projectsList.length === 0) {
    projectsList = [
      {
        id: "1",
        title: "The Silent Horizon",
        category: "Feature Film",
        cover:
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000",
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000",
        ],
      },
      {
        id: "2",
        title: "Neon Pulse Commercial",
        category: "Brand Film",
        cover:
          "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1000",
        ],
      },
      {
        id: "3",
        title: "Ethereal Portraits",
        category: "Editorial",
        cover:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000",
        ],
      },
      {
        id: "4",
        title: "Wilderness Echoes",
        category: "Documentary",
        cover:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000",
        ],
      },
      {
        id: "5",
        title: "Urban Solitude",
        category: "Street Cinematic",
        cover:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1000",
        ],
      },
    ];
  }

  const displayProjects = [...projectsList, ...projectsList];

  useEffect(() => {
    if (!isMarquee) return;
    let animationFrameId;
    const container = scrollRef.current;
    if (!container) return;

    let isHovered = false;
    const handleMouseEnter = () => {
      isHovered = true;
    };
    const handleMouseLeave = () => {
      isHovered = false;
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    const scrollStep = () => {
      if (!isHovered && !isInteractingRef.current && container) {
        container.scrollLeft += 1.2;
        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMarquee]);

  const handleScrollUpdate = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const halfWidth = scrollWidth / 2;

      if (halfWidth > 0) {
        if (scrollLeft >= halfWidth) {
          scrollRef.current.scrollLeft = scrollLeft - halfWidth;
        } else if (scrollLeft <= 0) {
          scrollRef.current.scrollLeft = scrollLeft + halfWidth;
        }
      }

      const currentPos = scrollRef.current.scrollLeft;
      const totalScrollable =
        halfWidth > 0 ? halfWidth - clientWidth : scrollWidth - clientWidth;
      const progress =
        totalScrollable > 0 ? (currentPos / totalScrollable) * 100 : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScrollUpdate);
      return () => currentRef.removeEventListener("scroll", handleScrollUpdate);
    }
  }, []);

  const triggerInteractionLock = () => {
    isInteractingRef.current = true;
    if (interactionTimeoutRef.current)
      clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 2500);
  };

  const scrollLeft = () => {
    triggerInteractionLock();
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -460, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    triggerInteractionLock();
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 460, behavior: "smooth" });
    }
  };

  const handleTimelineScrollerClick = (e) => {
    triggerInteractionLock();
    const timelineBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const barWidth = timelineBar.clientWidth;
    const percentage = clickPosition / barWidth;

    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      const halfWidth = scrollWidth / 2;
      const totalScrollable = halfWidth - clientWidth;
      scrollRef.current.scrollTo({
        left: totalScrollable * percentage,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="cinematic-projects-section"
      id="projects"
      ref={sectionRef}
    >
      <div className="cinematic-header">
        <div>
          <div className="subtitle-badge">
            <span>Curated Reels</span>
          </div>
          <h2 className="section-title">Motion & Stills Timeline</h2>
        </div>

        <div className="reel-controls">
          <button
            className="control-btn"
            onClick={scrollLeft}
            aria-label="Previous"
          >
            ←
          </button>
          <button
            className="control-btn"
            onClick={scrollRight}
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      <p className="section-desc">
        {isMarquee
          ? "Continuous auto-scrolling film reel. Use buttons or scroller to navigate anytime, or hover to pause."
          : "Browse through the timeline frames manually using controls or drag across."}
      </p>

      <div className="film-reel-container">
        <div className="film-reel-track" ref={scrollRef}>
          {displayProjects.map((project, index) => (
            <div
              className="film-frame-card"
              key={`${project.id}-${index}`}
              onClick={() => setSelectedProject(project)}
            >
              <div className="frame-perforations top">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="frame-media-box">
                {project.videoUrl ? (
                  <iframe
                    src={project.videoUrl}
                    title={project.title}
                    className="frame-iframe"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="frame-image"
                  />
                )}
                <div className="frame-overlay-gradient"></div>
                <span className="frame-index">
                  #0{(index % projectsList.length) + 1}
                </span>
              </div>

              <div className="frame-info-box">
                <span className="frame-category">{project.category}</span>
                <h3>{project.title}</h3>
                <span className="explore-cue">Explore Frame →</span>
              </div>

              <div className="frame-perforations bottom">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="timeline-scroller-wrapper"
        onClick={handleTimelineScrollerClick}
      >
        <div className="timeline-scroller-track">
          <div
            className="timeline-scroller-thumb"
            style={{ left: `${scrollProgress * 0.8}%` }}
          >
            <span className="thumb-grip"></span>
          </div>
        </div>
      </div>

      {selectedProject && (
        <div
          className="cinematic-modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="cinematic-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-exit-btn"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            <div className="modal-top-info">
              <span className="modal-tag">{selectedProject.category}</span>
              <h2>{selectedProject.title}</h2>
              <p className="modal-instruction">
                Click any photo below to view in full screen.
              </p>
            </div>

            <div className="modal-photos-masonry">
              {selectedProject.cover && (
                <div
                  className="masonry-item feature"
                  onClick={() => setActiveImage(selectedProject.cover)}
                >
                  <img src={selectedProject.cover} alt="Cover" />
                  <div className="zoom-hover-hint">🔍 View Full</div>
                </div>
              )}
              {selectedProject.gallery &&
                selectedProject.gallery.map((imgUrl, i) => (
                  <div
                    className="masonry-item"
                    key={i}
                    onClick={() => setActiveImage(imgUrl)}
                  >
                    <img src={imgUrl} alt={`Gallery ${i}`} />
                    <div className="zoom-hover-hint">🔍 View Full</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {activeImage && (
        <div className="lightbox-overlay" onClick={() => setActiveImage(null)}>
          <div
            className="lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close-btn"
              onClick={() => setActiveImage(null)}
            >
              x
            </button>
            <img
              src={activeImage}
              alt="Full view preview"
              className="lightbox-full-img"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
