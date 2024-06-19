import { useEffect } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ProtectedRoutes } from './routes/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { WalletPage } from './pages/WalletPage';
import useWebApp from './hooks/useWebApp';
import useWebAppViewport from './hooks/useWebAppViewport';
import { SpinLoading } from 'antd-mobile';
import styles from './App.module.scss';

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

function Loading() {
    return (
        <div className={styles.loadingDiv} >
            <SpinLoading color='primary'/>
        </div>
    )
}

function App() {
    const {ready, isReady} = useWebApp();
    const {expand, isExpanded, isCompleted} = useWebAppViewport();

    useEffect(() => {
        ready()
        if (isReady) {
          expand();
        }
    }, [expand, isReady, ready]);

    useEffect(() => {
        document.documentElement.setAttribute('data-prefers-color-scheme', 'dark');
    }, []);

    return <div>{isExpanded.toString()}</div>
    if (!isExpanded) {
        return <></>
    }

    return isCompleted ? <RouterProvider router={router} /> : <Loading />;
}

export default App;
