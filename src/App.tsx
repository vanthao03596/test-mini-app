import { useEffect } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.scss';
import { ProtectedRoutes } from './routes/ProtectedRoute';
import { HomePage } from './pages/HomePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <HomePage /> }],
    },
    {
        path: '*',
        element: <Navigate to='/' />,
    },
]);

function App() {
    useEffect(() => {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-prefers-color-scheme', 'dark');
    }, []);
    
    return <RouterProvider router={router} />;
}

export default App;
