import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gifts from './pages/Gifts';
import Confirmation from './pages/Confirmation';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentPending from './pages/PaymentPending';
import PaymentError from './pages/PaymentError';

// Componente para scroll to top em mudança de rota
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="presentes" element={<Gifts />} />
          <Route path="confirmacao" element={<Confirmation />} />
          <Route path="pagamento/sucesso" element={<PaymentSuccess />} />
          <Route path="pagamento/pendente" element={<PaymentPending />} />
          <Route path="pagamento/erro" element={<PaymentError />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
