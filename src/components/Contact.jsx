import React, { useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

const Contact = ({ texts = {} }) => {
  const [state, handleSubmit] = useForm("xaeqjbak");
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-wrapper > *",
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

  const email = texts.contact_email || "hello@studiocinema.com";
  const phone = texts.contact_phone || "+91 98765 43210";
  const location = texts.contact_location || "Chennai, Tamil Nadu";
  const instagram = texts.social_insta || "https://instagram.com";
  const whatsapp = texts.social_whatsapp || "https://whatsapp.com";

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-header">
        <div className="subtitle-badge">
          <span>Get In Touch</span>
        </div>
        <h2 className="section-title">Let's Create Together</h2>
        <p className="contact-subtitle">
          Have a project in mind or want to book a session? Drop a message
          below.
        </p>
      </div>

      <div className="contact-wrapper">
        <div className="contact-info-box">
          <h3>Contact Details</h3>
          <p className="contact-desc">
            Ready to turn your vision into a cinematic masterpiece? Reach out
            through any channel.
          </p>

          <div className="info-item">
            <div className="info-icon-box">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <span className="info-label">Email Me</span>
              <p>{email}</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon-box">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <span className="info-label">Call / WhatsApp</span>
              <p>{phone}</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon-box">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <span className="info-label">Location</span>
              <p>{location}</p>
            </div>
          </div>

          <div className="social-links-row">
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="social-pill"
            >
              Instagram
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="social-pill"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <form className="contact-form-box" onSubmit={handleSubmit}>
          <h3>Send a Message</h3>

          {state.succeeded && (
            <div className="success-alert">
              Thank you! Your message has been sent successfully.
            </div>
          )}

          <div className="form-group">
            <label>Your Name</label>
            <input type="text" name="name" placeholder="Enter Your Name" required />
          </div>

          <div className="form-group">
            <label>Your Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@example.com"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>

          <div className="form-group">
            <label>Your Message / Project Details</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Tell me about your wedding, commercial, or creative project..."
              required
            ></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={state.submitting}
          >
            {state.submitting ? "Sending..." : "Send Message →"}
          </button>
        </form>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Tharun Mani Portfolio. 
        </p>
      </div>
    </section>
  );
};

export default Contact;
