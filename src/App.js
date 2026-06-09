import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Contact from './components/Contact';

const Home = () => (
  <div className="bg-black min-h-screen">
    <TopBar />
    <Hero />
    <Marquee bg="bg-[#F8D766]" text="text-black" />
    <About />
    <Marquee reverse bg="bg-[#F85D7F]" text="text-black" />
    <Projects />
    <Skills />
    <Marquee bg="bg-[#7DD3C0]" text="text-black" />
    <Journey />
    <Contact />
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes><Route path="/" element={<Home />} /></Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
