import { useEffect } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.scss';
import { ProtectedRoutes } from './routes/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { WalletPage } from './pages/WalletPage';
// import useWebApp from './hooks/useWebApp';
// import useWebAppViewport from './hooks/useWebAppViewport';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoutes />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'wallet',
                element: <WalletPage />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to='/' />,
    },
]);

function App() {
    // const {ready, isReady} = useWebApp();
    // const {expand} = useWebAppViewport();

    useEffect(() => {
        window.Telegram.WebApp.ready()
        // window.Telegram.WebApp.expand();
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-prefers-color-scheme', 'dark');
    }, []);

    return <RouterProvider router={router} />;
}

export default App;
