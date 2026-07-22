import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScriptRunner() {
  const location = useLocation();

  useEffect(() => {
    // 1. Scroll reveal
    const revEls = document.querySelectorAll('.reveal');
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          e.target.classList.add('visible'); // some pages use .visible
        }
      });
    }, { threshold: 0.1 });
    revEls.forEach((el) => ro.observe(el));

    // 2. Stagger service cards
    const sgrid = document.querySelector('.svc-grid');
    if (sgrid) {
      const sro = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.svc-card').forEach((c, i) => {
              c.style.opacity = '0';
              c.style.transform = 'translateY(22px)';
              c.style.transition = `opacity .5s ease ${i * 0.07}s, transform .5s ease ${i * 0.07}s`;
              setTimeout(() => {
                c.style.opacity = '1';
                c.style.transform = 'none';
              }, 30);
            });
            sro.disconnect();
          }
        });
      }, { threshold: 0.08 });
      sro.observe(sgrid);
    }

    // 3. Counter (data-count)
    document.querySelectorAll('[data-count]').forEach((el) => {
      const co = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = +e.target.dataset.count;
            const suffix = e.target.dataset.suffix || '+';
            let start = null;
            const step = (ts) => {
              if (!start) start = ts;
              const p = Math.min((ts - start) / 1200, 1);
              const ease = 1 - Math.pow(1 - p, 3);
              e.target.textContent = Math.floor(ease * target) + suffix;
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            co.unobserve(e.target);
          }
        });
      }, { threshold: 0.5 });
      co.observe(el);
    });

    return () => {
      ro.disconnect();
    };
  }, [location]);

  useEffect(() => {
    // 4. Custom Cursor
    const cur = document.getElementById('cur');
    const curR = document.getElementById('curR');
    
    if (cur && curR) {
      let mx = 0, my = 0, rx = 0, ry = 0;
      let animationFrameId;
      
      const onMouseMove = (e) => {
        mx = e.clientX;
        my = e.clientY;
        cur.style.left = mx + 'px';
        cur.style.top = my + 'px';
      };
      
      const loop = () => {
        rx += (mx - rx) * 0.13;
        ry += (my - ry) * 0.13;
        curR.style.left = rx + 'px';
        curR.style.top = ry + 'px';
        animationFrameId = requestAnimationFrame(loop);
      };
      
      document.addEventListener('mousemove', onMouseMove);
      loop();
      
      // Cursor hover effects
      const interactiveEls = document.querySelectorAll('a, button, .svc-card, .feat-item, .norm-badge, .quiz-opt');
      const onEnter = () => {
        cur.style.width = '16px'; cur.style.height = '16px';
        curR.style.width = '48px'; curR.style.height = '48px';
      };
      const onLeave = () => {
        cur.style.width = '10px'; cur.style.height = '10px';
        curR.style.width = '32px'; curR.style.height = '32px';
      };
      
      interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });

      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(animationFrameId);
        interactiveEls.forEach(el => {
          el.removeEventListener('mouseenter', onEnter);
          el.removeEventListener('mouseleave', onLeave);
        });
      };
    }
  }, [location]);

  useEffect(() => {
    // 5. Progress bar
    const prog = document.getElementById('prog');
    if (prog) {
      const onScroll = () => {
        const s = document.documentElement.scrollTop;
        const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        prog.style.width = (s / h * 100) + '%';
      };
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, []);

  return null;
}
