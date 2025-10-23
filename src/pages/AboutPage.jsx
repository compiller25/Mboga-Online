import { useState } from "react";
import "./AboutPage.css";

const BASE_PATH = "/Mboga-Online"; // <-- Add your repo name here

export default function AboutPage() {
  const [submitted, setSubmitted] = useState(false);
  const [whatsAppLink, setWhatsAppLink] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const phoneNumber = "255710379610"; // Your WhatsApp number
    const text = `Hello, my name is ${formData.name}. My email is ${formData.email}. Message: ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    setWhatsAppLink(`https://wa.me/${phoneNumber}?text=${encodedText}`);

    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="about-page">
      {/* About Card */}
      <div className="about-card">
        <h1>About Mboga Online</h1>
        <p>
          Welcome to Mboga Online! We provide fresh, organic vegetables
          delivered straight to your door. Our mission is to make healthy eating
          easy and accessible for everyone.
        </p>
      </div>

      {/* Contact Card */}
      <div className="contact-card">
        <h2>Contact Us</h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="contact-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
              />
            </label>
            <label>
              Message:
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                required
              ></textarea>
            </label>
            <button type="submit">Send Message</button>
          </form>
        ) : (
          <div>
            <p className="success-message">
              ✅ Your message has been received successfully. We’ll get back to you soon!
            </p>
            {whatsAppLink && (
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="whatsapp-button"
              >
                📲 Send via WhatsApp
              </a>
            )}
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="social-links">
        <h3>Follow Us</h3>
        <div className="icons">
          <a href="https://wa.me/255757808854" target="_blank" rel="noreferrer">
            <img src={`${BASE_PATH}/icons/wat.jpeg`} alt="Whatsapp" />
          </a>
          <a href="https://instagram.com/yourpage" target="_blank" rel="noreferrer">
            <img src={`${BASE_PATH}/icons/insta.png`} alt="Instagram" />
          </a>
          <a href="https://tiktok.com/@yourpage" target="_blank" rel="noreferrer">
            <img src={`${BASE_PATH}/icons/tiktok.jpeg`} alt="TikTok" />
          </a>
          <a href="https://x.com/yourpage" target="_blank" rel="noreferrer">
            <img src={`${BASE_PATH}/icons/x.jpeg`} alt="X" />
          </a>
        </div>
      </div>
    </div>
  );
}