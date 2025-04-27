import { Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Header";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Performance from "./pages/Performance";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex min-h-screen">
      <Header />

      <div className="flex-1 flex flex-col bg-gradient-to-r from-blue-100 to-green-100">
        {/* <Navbar /> */}

        <main className="p-6 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
