import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfiguratorPage } from './pages/Configurator';
import { BeginPage } from './pages/BeginPage';

// Application routes configuration
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/configuration" element={<ConfiguratorPage />} />
        <Route path="/begin" element={<BeginPage />} />
      </Routes>
    </Router>
  );
}

export default App;

