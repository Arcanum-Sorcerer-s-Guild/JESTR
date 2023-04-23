import React from 'react';
import { Routes, Route, UseNavigate, Navigate } from 'react-router-dom';
import Reserve from '../pages/Reserve/Reserve.js';
import Reservation from '../pages/Reservation/Reservation.js';
import AllReservations from '../pages/AllReservations/AllReservations.js';
import AllAssets from '../pages/AllAssets/AllAssets.js';
import Asset from '../pages/Asset/Asset.js';
import AdminStats from '../pages/AdminStats/AdminStats.js';
import MyBook from '../pages/Book/MyBook';

export default function AdminAuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MyBook />} />
            <Route path="/QuickLook" element={<MyBook />} />
            <Route path="/Reserve" element={<Reserve />} />
            <Route path="/AllReservations" element={<AllReservations />} />
            <Route path="/AllReservations/:page" element={<AllReservations />} />
            <Route path="/Reservation/:id" element={<Reservation />} />
            <Route path="/AllAssets" element={<AllAssets />} />
            <Route path="/Asset/:id" element={<Asset />} />
            <Route path="/Admin" element={<AdminStats />} />
            <Route path="/Book" element={<MyBook />} />
        </Routes>
    )
}