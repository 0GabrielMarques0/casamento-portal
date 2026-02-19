import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gifts from './pages/Gifts';
import Confirmation from './pages/Confirmation';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentPending from './pages/PaymentPending';
import PaymentError from './pages/PaymentError';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
