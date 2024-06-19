import { useState } from "react";

const useWebApp = () => {
  const [isReady, setIsReady] = useState(false);

  const ready: typeof Telegram.WebApp.ready = () => {
    Telegram.WebApp.ready();
    setTimeout(() => {
      setIsReady(true);
    }, 1000)
  };

  return {
    ready,
    isReady,
  };
};

export default useWebApp;
