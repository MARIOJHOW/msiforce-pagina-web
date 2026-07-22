import { motion } from 'framer-motion';
import './DiferencialBanner.css';

export default function DiferencialBanner() {
  return (
    <motion.div
      className="dif-banner"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
