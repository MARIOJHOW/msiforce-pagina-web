import { Link } from 'react-router-dom';
import './Footer.css';

const WA_LINK = 'https://wa.me/5511910773865?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20MSIFORCE%20e%20gostaria%20de%20solicitar%20uma%20consultoria%20gratuita.';

const Footer = () => {
  return (
    <footer className="msi-footer">
      <div className="msi-f-top">

        <div className="msi-f-brand">
          <div className="msi-f-logo">
            <img src="/logo.webp" alt="MSIFORCE Logo" />
            <span className="msi-f-name">MSIFORCE</span>
          </div>
          <p className="msi-f-tagline">
            Elétrica. Tecnologia. Segurança.<br />
            Tudo em um parceiro.
          </p>
          <div className="msi-f-norms">
            <span>NR-10</span>
            <span>NR-35</span>
            <span>ABNT 5410</span>
          </div>
        </div>

        <div className="msi-f-col">
          <h4 className="msi-f-col-title">Soluções</h4>
          <ul>
            <li><a href="/#servicos">Projetos Elétricos</a></li>
            <li><a href="/#servicos">Automação Residencial</a></li>
            <li><a href="/#servicos">CFTV & Monitoramento</a></li>
            <li><a href="/#servicos">Controle de Acesso</a></li>
            <li><a href="/#servicos">Redes Estruturadas</a></li>
            <li><a href="/#servicos">Infraestrutura de TI</a></li>
            <li><a href="/#servicos">Manutenção Preventiva & Corretiva</a></li>
          </ul>
        </div>

        <div className="msi-f-col">
          <h4 className="msi-f-col-title">Setores</h4>
          <ul>
            <li><span>Empresas & Escritórios</span></li>
            <li><span>Condomínios</span></li>
            <li><span>Indústrias</span></li>
            <li><span>Clínicas & Consultórios</span></li>
            <li><span>Comércios</span></li>
            <li><span>Redes de Franquias</span></li>
          </ul>
        </div>

        <div className="msi-f-col">
          <h4 className="msi-f-col-title">Contato</h4>
          <ul className="msi-f-contact">
            <li>
              <span className="msi-f-contact-icon">📱</span>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                (11) 91077-3865
              </a>
            </li>
            <li>
              <span className="msi-f-contact-icon">✉️</span>
              <a href="mailto:mario.junior@msiforce.com.br">mario.junior@msiforce.com.br</a>
            </li>
            <li>
              <span className="msi-f-contact-icon">📍</span>
              <span>São Paulo, SP — Brasil</span>
            </li>
            <li>
              <span className="msi-f-contact-icon">🕐</span>
              <span>Seg–Sex, 8h–18h</span>
            </li>
          </ul>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="msi-f-wa-btn">
            Falar no WhatsApp
          </a>
        </div>

      </div>

      <div className="msi-f-bottom">
        <p className="msi-f-copy">
          © {new Date().getFullYear()} MSIFORCE — Todos os direitos reservados &nbsp;·&nbsp;
          São Paulo, SP
        </p>
        <nav className="msi-f-links">
          <Link to="/">Home</Link>
          <Link to="/automacao">Automação</Link>
          <Link to="/blog">Blog</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
