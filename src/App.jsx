import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Journals from './components/Journals/Journals';
import Footer from './components/Footer/Footer';
import './App.css';
import './index.css';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Hero />
        <Journals />
      </main>
      <Footer />
    </div>
  );
}

export default App;
