import '@/lib/dayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SpinLoading } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.module.scss';
import styles from './App.module.scss';
import useWebApp from './hooks/useWebApp';
import useWebAppViewport from './hooks/useWebAppViewport';
import router from './routes/routes';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10000,
        },
    },
});

function Loading() {
    return (
        <div className={styles.loadingDiv}>
            <SpinLoading color='primary' />
        </div>
    );
}

function App() {
    const { ready, isReady, enableClosingConfirmation } = useWebApp();
    const { expand, isExpanded } = useWebAppViewport();

    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        ready();
        if (isReady) {
            expand();
            enableClosingConfirmation();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReady]);

    useEffect(() => {
        document.documentElement.setAttribute('data-prefers-color-scheme', 'dark');
    }, []);

    useEffect(() => {
        if (isExpanded && !isCompleted) {
            setTimeout(() => {
                setIsCompleted(true);
            }, 1500);
        }
    }, [isExpanded, isCompleted]);

    if (!isExpanded && !isReady) {
        return <></>;
    }

    if (!isCompleted) {
        return <Loading />;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
