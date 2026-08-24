import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScriptRunner from './components/ScriptRunner';

// Pages
import Home from './pages/Home/Home';
import Automacao from './pages/Automacao/Automacao';
import V2 from './pages/V2/V2';
import Blog from './pages/Blog/Blog';
import Faq from './pages/Faq/Faq';
import BlogPost from './pages/Blog/BlogPost';
import ServicoPage from './pages/Servicos/ServicoPage';
import CasaInteligente from './pages/CasaInteligente/CasaInteligente';

function V1Layout() {
  return (
    <>
      <a className="pular-conteudo" href="#conteudo">Pular para o conteúdo</a>
      <div className="cur" id="cur"></div>
      <div className="cur-r" id="curR"></div>
      <div className="progress" id="prog"></div>
      <ScriptRunner />
      <Navbar />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function App() {
  return (
    // reducedMotion="user" faz o Framer Motion respeitar prefers-reduced-motion
    // do sistema em TODAS as rotas, inclusive as que ficam fora do V1Layout.
    <MotionConfig reducedMotion="user">
    <Router>
      <Routes>
        <Route element={<V1Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/automacao" element={<Automacao />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/servicos/:slug" element={<ServicoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="/v2" element={<V2 />} />
        <Route path="/casa-inteligente" element={<CasaInteligente />} />
      </Routes>
    </Router>
    </MotionConfig>
  );
}

export default App;
