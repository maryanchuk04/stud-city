import React from "react";
import { Routes, Route } from "react-router-dom"
import Authenticate from "./pages/authenticate/Authenticate";
import Registration from "./pages/registration/Registration";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="authenticate" element = { <Authenticate /> } />
                <Route path="registration" element = { <Registration /> } />
            </Routes>
        </div>
    );
}

export default App;
