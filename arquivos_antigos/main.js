/* ═══════════════════════════════════════════════
   MSIFORCE — main.js
   Preloader · reveals · counters · marquee ·
   accordion animado · form → WhatsApp
   ═══════════════════════════════════════════════ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Preloader + entrada do hero ─────────────── */
  const preloader = document.getElementById('preloader');
  function ready() {
    if (preloader) preloader.classList.add('done');
    document.body.classList.add('loaded'); // dispara .hero-in
  }
  if (reduceMotion) {
    ready();
  } else {
    // esconde rápido: no máx. 900ms, ou assim que a página carregar
    let done = false;
    const finish = () => { if (!done) { done = true; ready(); } };
    window.addEventListener('load', () => setTimeout(finish, 350));
    setTimeout(finish, 900);
  }

  /* ── Barra de progresso de scroll ────────────── */
  const progress = document.getElementById('progress');
  const header = document.getElementById('siteHeader');
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
        if (header) header.classList.toggle('scrolled', h.scrollTop > 10);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Menu mobile ─────────────────────────────── */
  const menuBtn = document.getElementById('menuBtn');
  const siteNav = document.getElementById('siteNav');
  if (menuBtn && siteNav) {
    menuBtn.addEventListener('click', () => {
      const open = siteNav.classList.toggle('open');
      menuBtn.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    siteNav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        siteNav.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      })
    );
  }

  /* ── Reveal on scroll (+ stagger) ────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add('in-view');
          if (el.classList.contains('stagger')) {
            Array.from(el.children).forEach((child, i) => {
              child.style.setProperty('--sd', (i * 0.09).toFixed(2) + 's');
            });
          }
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ── Contadores animados (métricas do hero) ──── */
  const counters = document.querySelectorAll('.metric__val[data-count]');
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const dur = 1600;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(eased * target) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { animateCounter(e.target); cio.unobserve(e.target); }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach((c) => { c.textContent = (c.dataset.count || '0') + (c.dataset.suffix || ''); });
  }

  /* ── Marquee de certificações (duplica trilha) ─ */
  const track = document.getElementById('certsTrack');
  if (track) {
    const group = track.querySelector('.certs-strip__group');
    if (group) track.appendChild(group.cloneNode(true)); // 2x = loop perfeito (translateX -50%)
  }

  /* ── Accordion FAQ com animação de altura ────── */
  document.querySelectorAll('.acc-item').forEach((item) => {
    const summary = item.querySelector('summary');
    const body = item.querySelector('.acc-item__body');
    if (!summary || !body) return;
    if (reduceMotion) return; // deixa o comportamento nativo

    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.open) {
        // fechar animado
        body.style.height = body.scrollHeight + 'px';
        requestAnimationFrame(() => {
          body.style.transition = 'height .35s cubic-bezier(.4,0,.2,1)';
          body.style.height = '0px';
        });
        body.addEventListener('transitionend', function h() {
          item.open = false;
          body.style.cssText = '';
          body.removeEventListener('transitionend', h);
        });
      } else {
        item.open = true;
        const target = body.scrollHeight;
        body.style.height = '0px';
        requestAnimationFrame(() => {
          body.style.transition = 'height .4s cubic-bezier(.22,1,.36,1)';
          body.style.height = target + 'px';
        });
        body.addEventListener('transitionend', function h() {
          body.style.cssText = '';
          body.removeEventListener('transitionend', h);
        });
      }
    });
  });

  /* ── Formulário → WhatsApp ───────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = (id) => (document.getElementById(id) || {}).value || '';
      const nome = val('f-nome').trim();
      const tel = val('f-tel').trim();
      const svc = val('f-svc').trim();
      const desc = val('f-desc').trim();

      let msg = 'Olá! Vim pelo site da MSIFORCE e gostaria de um orçamento.';
      if (nome) msg += '\n\n*Nome:* ' + nome;
      if (tel) msg += '\n*Telefone:* ' + tel;
      if (svc) msg += '\n*Serviço:* ' + svc;
      if (desc) msg += '\n*Descrição:* ' + desc;

      window.open('https://wa.me/5511910773865?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  }
})();
