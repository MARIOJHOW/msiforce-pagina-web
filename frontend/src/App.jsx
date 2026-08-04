import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScriptRunner from './components/ScriptRunner';

// Pages
import Home from './pages/Home/Home';
import Automacao from './pages/Automacao/Automacao';
import V2 from './pages/V2/V2';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPost';
import ServicoPage from './pages/Servicos/ServicoPage';
import CasaInteligente from './pages/CasaInteligente/CasaInteligente';

function V1Layout() {
  return (
    <>
      <div className="cur" id="cur"></div>
      <div className="cur-r" id="curR"></div>
      <div className="progress" id="prog"></div>
      <ScriptRunner />
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<V1Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/automacao" element={<Automacao />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/servicos/:slug" element={<ServicoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="/v2" element={<V2 />} />
        <Route path="/casa-inteligente" element={<CasaInteligente />} />
      </Routes>
    </Router>
  );
}

export default App;
