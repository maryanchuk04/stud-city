import React from "react";
import { Routes, Route } from "react-router-dom"
import Authenticate from "./pages/authenticate/Authenticate";
import Registration from "./pages/registration/Registration";
import VerifyEmail from "./pages/verify-email/VerifyEmail";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="authenticate" element = { <Authenticate /> } />
                <Route path="registration" element = { <Registration /> } />
                <Route path="verify-email/:acountId" element = { <VerifyEmail /> } />
            </Routes>
        </div>
    );
}

export default App;
