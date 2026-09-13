import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { linkWhatsApp } from '../lib/whatsapp';
import './Navbar.css';

const WA_MENSAGEM = 'Olá, vim pelo site da MSIFORCE e gostaria de solicitar uma consultoria.';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Trocou de rota? Fecha o menu ainda na renderizacao, antes da pintura.
  const [rotaAnterior, setRotaAnterior] = useState(location.pathname);
  if (rotaAnterior !== location.pathname) {
    setRotaAnterior(location.pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`msi-nav${scrolled ? ' msi-nav--scrolled' : ''}`}>
        <Link to="/" className="msi-nav-logo" onClick={() => setMenuOpen(false)}>
          <img src="/logo-simbolo.webp" alt="Logo MSIFORCE" width="40" height="40" />
          <span className="msi-nav-name">MSIFORCE</span>
        </Link>

        <ul className="msi-nav-links">
          <li>
            {isHome ? <a href="#sobre">Sobre</a> : <Link to="/#sobre">Sobre</Link>}
          </li>
          <li>
            {isHome ? <a href="#servicos">Serviços</a> : <Link to="/#servicos">Serviços</Link>}
          </li>
          <li><Link to="/automacao">Automação</Link></li>
          <li><Link to="/casa-inteligente">Fechaduras Digitais</Link></li>
          <li>
            {isHome ? <a href="#contato">Contato</a> : <Link to="/#contato">Contato</Link>}
          </li>
          <li>
            <a
              href={linkWhatsApp(WA_MENSAGEM)}
              className="msi-nav-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Orçamento
            </a>
          </li>
        </ul>

        <button
          className={`msi-hamburger${menuOpen ? ' msi-hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`msi-drawer${menuOpen ? ' msi-drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <ul className="msi-drawer-links">
          <li>
            {isHome
              ? <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
              : <Link to="/#sobre" onClick={() => setMenuOpen(false)}>Sobre</Link>}
          </li>
          <li>
            {isHome
              ? <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
              : <Link to="/#servicos" onClick={() => setMenuOpen(false)}>Serviços</Link>}
          </li>
          <li><Link to="/automacao" onClick={() => setMenuOpen(false)}>Automação</Link></li>
          <li><Link to="/casa-inteligente" onClick={() => setMenuOpen(false)}>Fechaduras Digitais</Link></li>
          <li>
            {isHome
              ? <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
              : <Link to="/#contato" onClick={() => setMenuOpen(false)}>Contato</Link>}
          </li>
          <li>
            <a
              href={linkWhatsApp(WA_MENSAGEM)}
              className="msi-drawer-cta"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Solicitar Orçamento
            </a>
          </li>
        </ul>
      </div>

      {menuOpen && (
        <div className="msi-drawer-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}
    </>
  );
};

export default Navbar;
