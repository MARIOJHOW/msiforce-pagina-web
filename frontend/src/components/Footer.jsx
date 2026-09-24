import { Link } from 'react-router-dom';
import { linkWhatsApp } from '../lib/whatsapp';
import './Footer.css';

const WA_MENSAGEM = 'Olá, vim pelo site da MSIFORCE e gostaria de solicitar uma consultoria.';

const Footer = () => {
  // Montado no render, não em constante de módulo: o marcador de origem de Ads
  // precisa entrar no link também quando a rota muda sem recarregar a página.
  const WA_LINK = linkWhatsApp(WA_MENSAGEM);

  return (
    <footer className="msi-footer">
      <div className="msi-f-top">

        <div className="msi-f-brand">
          <div className="msi-f-logo">
            <img src="/logo-simbolo.webp" alt="Logo MSIFORCE" width="36" height="36" />
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
          <h3 className="msi-f-col-title">Soluções</h3>
          {/* As soluções com página própria em /servicos/:slug apontam para ela,
              não para a âncora da home: até 17/09/2026 as quatro páginas eram
              órfãs (nenhum link no site levava a elas) e o Google só as conhecia
              por histórico. As duas que ainda não têm página seguem na âncora. */}
          <ul>
            <li><Link to="/servicos/eletrica">Projetos Elétricos</Link></li>
            <li><Link to="/servicos/automacao">Automação Predial e de Condomínios</Link></li>
            <li><Link to="/servicos/cftv">CFTV & Monitoramento</Link></li>
            <li><Link to="/servicos/acesso">Controle de Acesso</Link></li>
            <li><Link to="/servicos/redes-ti">Redes Estruturadas</Link></li>
            <li><Link to="/servicos/redes-ti">Infraestrutura de TI</Link></li>
            <li><a href="/#servicos">Manutenção Preventiva & Corretiva</a></li>
          </ul>
        </div>

        <div className="msi-f-col">
          <h3 className="msi-f-col-title">Setores</h3>
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
          <h3 className="msi-f-col-title">Contato</h3>
          <ul className="msi-f-contact">
            <li>
              <span className="msi-f-contact-icon">📱</span>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                (11) 91077-3865
              </a>
            </li>
            <li>
              <span className="msi-f-contact-icon">✉️</span>
              <a href="mailto:contato@msiforce.com.br">contato@msiforce.com.br</a>
            </li>
            <li>
              <span className="msi-f-contact-icon">📍</span>
              <span>São Paulo, SP — Brasil</span>
            </li>
            <li>
              <span className="msi-f-contact-icon">🕐</span>
              <span>Todos os dias, 7h–21h</span>
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
          <Link to="/automacao">Automação Residencial</Link>
          <Link to="/casa-inteligente">Modelos de Fechadura Digital</Link>
          <Link to="/instalacao-fechadura-digital">Instalação de Fechadura Digital</Link>
          <Link to="/fechadura-airbnb">Fechadura Digital para Airbnb</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/faq">Perguntas frequentes</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
