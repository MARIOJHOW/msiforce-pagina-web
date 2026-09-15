import { motion } from 'framer-motion';
import './DiferencialBanner.css';

export default function DiferencialBanner() {
  return (
    <motion.div
      className="dif-banner"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      /* Sem delay. Havia um `delay: 1.2` aqui, pensado para a faixa entrar so depois
         do hero assentar (5 filhos em stagger de 0.12s x 0.9s de duracao, ~1.38s).
         So que a animacao e `animate`, nao `whileInView`: ela roda no relogio, nao no
         scroll. No celular, quem desliza o polegar de cara terminava de "revelar" a
         faixa com ela ja fora da tela -- ou seja, nunca via a unica linha da home que
         diz que a MSIFORCE faz eletrica, TI e seguranca sem terceirizar. */
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="dif-banner-inner">
        <span className="dif-banner-pill">Por que a MSIFORCE?</span>
        <p className="dif-banner-text">
          Uma empresa. Elétrica, TI e segurança —&nbsp;
          <strong>sem terceirizar nada.</strong>
        </p>
        <a href="#servicos" className="dif-banner-link">Ver soluções →</a>
      </div>
    </motion.div>
  );
}
