import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/common/Navigation';
import { Footer } from './components/common/Footer';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { ProjectDetails } from './pages/ProjectDetails';
import { GradientBlobs } from './components/backgrounds/GradientBlobs';
import './App.css';

export function App() {
  return (
    <Router>
      <div className="app flex flex-col min-h-screen">
        {/* Skip Link para acessibilidade */}
        <a href="#main-content" className="skip-link">
          Pular para conteúdo principal
        </a>
        <GradientBlobs />
        <Navigation />
        <main id="main-content" className="main-content flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:projectId" element={<ProjectDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
