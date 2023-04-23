import React from 'react';
import { Routes, Route, UseNavigate, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login.js';
import Register from '../pages/Register/Register.js';

export default function NoAuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}