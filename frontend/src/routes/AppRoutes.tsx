import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { MovieRecomendation } from "../pages/MovieRecomendation";

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/Home" />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/Register" element={<RegisterPage />} />
                <Route path="/New-Movie-Recomendation" element={<MovieRecomendation />} />
            </Routes>
        </Router>
    );
};
