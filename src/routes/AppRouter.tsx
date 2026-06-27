import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from '../pages/Dashboard/Dashboard';
import Products from '../pages/Products/Products';
import Categories from '../pages/Categories/Categories';
import Producers from '../pages/Producers/Producers';

export default function AppRouter() {
    return (
        <Routes>

            <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/dashboard/products"
                element={<Products />}
            />

            <Route
                path="/dashboard/categories"
                element={<Categories />}
            />

            <Route
                path="/dashboard/producers"
                element={<Producers />}
            />

            <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
            />

        </Routes>
    );
}