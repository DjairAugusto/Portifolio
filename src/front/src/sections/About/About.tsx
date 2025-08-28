
import "./About.css";
import FadeInWrapper from "../../components/FadeInWrapper";
import { useLanguage } from "../../hooks/useLanguage";
import AboutHeaderImg from '../../assets/AboutHeader.png';
import { FaDocker, FaReact, FaHtml5, FaCss3Alt, FaJava } from 'react-icons/fa';
import { SiC, SiTypescript } from 'react-icons/si';

function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section">
      <FadeInWrapper>
        <h2>{t.about.title}</h2>
      </FadeInWrapper>
      <FadeInWrapper delay={200}>
        <div className="about-content">
          <div style={{ flex: 1 }}>
            <p>{t.about.description}</p>
            <div className="about-skills-inline">
              <span className="about-skills-title">{t.about.skillsTitle || (t.about.title === "SOBRE MIM" ? "HABILIDADES" : "SKILLS")}</span>
              <div className="about-skills-languages">
                <span className="lang-tag"><FaDocker style={{ color: '#2496ed' }} /> <span>Docker</span></span>
                <span className="lang-tag"><SiC style={{ color: '#A8B9CC' }} /> <span>C</span></span>
                <span className="lang-tag"><FaJava style={{ color: '#e76f00' }} /> <span>Java</span></span>
                <span className="lang-tag"><FaReact style={{ color: '#61dafb' }} /> <span>React</span></span>
                <span className="lang-tag"><FaHtml5 style={{ color: '#e44d26' }} /> <span>HTML</span></span>
                <span className="lang-tag"><FaCss3Alt style={{ color: '#2965f1' }} /> <span>CSS</span></span>
                <span className="lang-tag"><SiTypescript style={{ color: '#3178c6' }} /> <span>TypeScript</span></span>
              </div>
            </div>
          </div>
          <img src={AboutHeaderImg} alt="About Header" className="about-header-img" />
        </div>
      </FadeInWrapper>
    </section>
  );
}

export default About;