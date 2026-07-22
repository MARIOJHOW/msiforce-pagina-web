import './WhatsAppButton.css';

const WhatsAppButton = () => {
  return (
    <div className="msi-wa">
      <div className="msi-wa-lbl">Fale Agora!</div>
      <a 
        href="https://wa.me/5511910773865?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20MSIFORCE%20e%20gostaria%20de%20atendimento." 
        target="_blank" 
        rel="noopener noreferrer"
        className="msi-wa-b"
      >
        💬
      </a>
    </div>
  );
};

export default WhatsAppButton;
