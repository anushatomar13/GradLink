import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NetworkDivider from './components/NetworkDivider';
import AboutUs from './components/AboutSection';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Contact from './components/Contact';
import Support from './components/Support';
import { AuthFlow, Dashboard } from './components/AuthFlow';
import ConnectPage from './components/ConnectPage';
// const DashboardSection = () => (
//   <div className="min-h-screen bg-gray-900 text-cyan-400 p-10">
//     <h1 className="text-3xl font-mono">Dashboard Coming Soon</h1>
//   </div>
// );

const EventsSection = () => (
  <div className="min-h-screen bg-gray-900 text-cyan-400 p-10">
    <h1 className="text-3xl font-mono">Events Coming Soon</h1>
  </div>
);

// const ConnectSection = () => (
//   <div className="min-h-screen bg-gray-900 text-cyan-400 p-10">
//     <h1 className="text-3xl font-mono">Connect Coming Soon</h1>
//   </div>
// );

const App = () => (
  <Router>
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <FeaturesSection />
            </>
          } />
          <Route path="/auth" element={<AuthFlow />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/events" element={<EventsSection />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy" element={<Privacy/>} />
          <Route path="/terms" element={<Terms/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/support" element={<Support/>} />
        </Routes>
      </main>
      <NetworkDivider />
      <Footer />
    </div>
  </Router>
);

export default App;