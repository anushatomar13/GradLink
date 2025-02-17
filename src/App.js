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
import {Dashboard } from './components/Dashboard';
import ConnectPage from './components/ConnectPage';
import DonationPage from './components/DonationPage';
import Events from './components/Events'
import { auth } from "./firebase";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/login";
import SignUp from "./components/register";

// const EventsSection = () => (
//   <div className="min-h-screen bg-gray-900 text-cyan-400 p-10">
//     <h1 className="text-3xl font-mono">Events Coming Soon</h1>
//   </div>
// );

const App = () => (
  <Router basename="/">
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/donate" element={<DonationPage />} />
        </Routes>
        <ToastContainer />
      </main>
      <NetworkDivider />
      <Footer />
    </div>
  </Router>
);

export default App;
