//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import Header from './components/Header';
import './styles/main.scss';
import AboutPage from "./pages/AboutPage";

const App = () => {
    return (
        <Router>
            <div className="app">
                <Header title="Nice Nails" />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/booking" element={<BookingPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;