import "./Contact.css";
import FadeInWrapper from "../../components/FadeInWrapper";
import { useLanguage } from "../../hooks/useLanguage";


import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useState } from "react";

function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Mensagem enviada com sucesso!");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setShowPopup(false), 1200);
      } else {
        setError(data.error || "Erro ao enviar mensagem.");
      }
    } catch {
      setError("Erro ao conectar ao servidor.");
    }
    setLoading(false);
  };

  return (
    <footer id="contact" className="contact-section">
      <div className="contact-flex-wrapper">
        <div className="contact-left">
          <FadeInWrapper>
            <h2>{t.contact.title}</h2>
            <ul className="contact-list">
              <li>
                <FaLinkedin size={28} />
                <a
                  href="https://br.linkedin.com/in/djairaugusto"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <HiOutlineMail size={28} style={{ cursor: 'pointer' }} onClick={() => setShowPopup(true)} />
                <span style={{ cursor: 'pointer' }} onClick={() => setShowPopup(true)}>Email</span>
              </li>
              <li>
                <FaGithub size={28} />
                <a
                  href="https://github.com/DjairAugusto"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <FaInstagram size={28} />
                <a
                  href="https://instagram.com/user"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </FadeInWrapper>
        </div>
      </div>
      {showPopup && (
        <div className="contact-popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="contact-popup" onClick={e => e.stopPropagation()}>
            <div className="form-title" style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '16px' }}>Me envie um email!</div>
            <form className="contact-form" onSubmit={handleSubmit} style={{ marginBottom: 32, width: '100%' }}>
              <input
                type="text"
                name="name"
                placeholder="Seu nome"
                value={form.name}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
              <input
                type="email"
                name="email"
                placeholder="Seu email"
                value={form.email}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
              <textarea
                name="message"
                placeholder="Sua mensagem"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                style={{ width: '100%' }}
              />
              <button type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar"}
              </button>
              {success && <div className="contact-success">{success}</div>}
              {error && <div className="contact-error">{error}</div>}
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Contact;
