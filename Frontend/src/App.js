import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";

//Main App component
function App() {
    return (
        <Router >
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/" element={<Landing />} />
                <Route path="*" element={<Landing/>} />
            </Routes>
        </Router>
    );
}

//Export App component
export default App;
