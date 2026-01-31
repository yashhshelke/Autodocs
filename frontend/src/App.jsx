import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <>
            {/* Simple test to ensure React is rendering */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                background: 'red',
                color: 'white',
                padding: '10px',
                zIndex: 9999
            }}>
                React is working! ✓
            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;
