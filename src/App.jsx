import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ClassDetails from "./pages/ClassDetails.jsx";
import Booking from "./pages/Booking.jsx";
import Confirmation from "./pages/Confirmation.jsx";

export default function App() {
  return <div className="app-shell"><Header /><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/classes/:id" element={<ClassDetails />} />
    <Route path="/booking" element={<Booking />} />
    <Route path="/confirmation" element={<Confirmation />} />
    <Route path="*" element={<main className="page-wrap"><div className="state-panel"><h1>Page not found</h1><p>This page doesn't exist.</p><a className="button button-dark" href="/">Return home</a></div></main>} />
  </Routes><Footer /></div>;
}