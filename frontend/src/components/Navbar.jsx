import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const linkProps = (anchor) =>
    isHome
      ? { href: anchor, onClick: () => setMenuOpen(false) }
      : { as: Link, to: `/${anchor}` };

  return (
    <>
      <nav className={`msi-nav${scrolled ? ' msi-nav--scrolled' : ''}`}>
        <Link to="/" className="msi-nav-logo" onClick={() => setMenuOpen(false)}>
          <img src="/logo-simbolo.webp" alt="" width="40" height="40" />
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
          <li><Link to="/blog">Blog</Link></li>
          <li>
            {isHome ? <a href="#contato">Contato</a> : <Link to="/#contato">Contato</Link>}
          </li>
          <li>
            <a
              href="https://wa.me/5511910773865?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20MSIFORCE%20e%20gostaria%20de%20solicitar%20uma%20consultoria."
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
          <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
          <li>
            {isHome
              ? <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
              : <Link to="/#contato" onClick={() => setMenuOpen(false)}>Contato</Link>}
          </li>
          <li>
            <a
              href="https://wa.me/5511910773865?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20MSIFORCE%20e%20gostaria%20de%20solicitar%20uma%20consultoria."
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
