import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Products from '../pages/Products/Products';
import Categories from '../pages/Categories/Categories';
import Producers from '../pages/Producers/Producers';

import PrivateRoute from './PrivateRoute';

export default function AppRouter() {
    return (
        <Routes>

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />

            <Route
                path="/dashboard/products"
                element={
                    <PrivateRoute>
                        <Products />
                    </PrivateRoute>
                }
            />

            <Route
                path="/dashboard/categories"
                element={
                    <PrivateRoute>
                        <Categories />
                    </PrivateRoute>
                }
            />

            <Route
                path="/dashboard/producers"
                element={
                    <PrivateRoute>
                        <Producers />
                    </PrivateRoute>
                }
            />

        </Routes>
    );
}