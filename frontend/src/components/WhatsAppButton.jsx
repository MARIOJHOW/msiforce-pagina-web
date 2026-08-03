import './WhatsAppButton.css';
import { registrarConversaoWhatsApp } from '../lib/ads';
import { linkWhatsApp } from '../lib/whatsapp';

/**
 * Duas variantes:
 *  - Flutuante (padrão): sem props. É o uso espalhado pelo site — comportamento inalterado.
 *  - Inline: com `children` e/ou `className`, vira um link comum dentro do conteúdo.
 *
 * `message` personaliza o texto que chega no WhatsApp — é o que faz o bot abrir
 * o funil certo em vez do menu genérico.
 */
const WhatsAppButton = ({ message, className, children, label = 'Fale Agora!' }) => {
  const href = linkWhatsApp(message);

  if (children || className) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={registrarConversaoWhatsApp}
      >
        {children}
      </a>
    );
  }

  return (
    <div className="msi-wa">
      <div className="msi-wa-lbl">{label}</div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="msi-wa-b"
        onClick={registrarConversaoWhatsApp}
      >
        💬
      </a>
    </div>
  );
};

export default WhatsAppButton;
